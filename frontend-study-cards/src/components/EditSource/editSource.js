import './editSource.css';
import { setTempSourceTitle, setTempSourceDescription, setCurrentMainAppComponent, setStudySessionSource, setEditDataMainType } from '../../actionCreators/actionCreators.js'
import { connect } from 'react-redux';
import React, { Component } from 'react';
import NavButton from '../NavButton/NavButton.js';
import { updateSource, getSourceById } from '../../routeFunctions/routeFunctions.js';


class EditSource extends Component {

    componentDidMount() {
        this.props.setTempSourceTitle(this.props.studySessionSource.title);
        this.props.setTempSourceDescription(this.props.studySessionSource.description);

    }


    handleClickCancel = async () => {
        /* Reset the Temp Title & Description, then navigate back to "Home" */
        this.props.setTempSourceTitle(null);
        this.props.setTempSourceDescription(null);
        this.props.setEditDataMainType(null);
        this.props.setCurrentMainAppComponent(this.props.returnToValue);

    }


    handleClickSave = async () => {

        try {
            //Set body of source update
            const body = {
                title: this.props.tempSourceTitle,
                description: this.props.tempSourceDescription

            }

            //Update source and log any error 
            const response = await updateSource(this.props.studySessionSource._id, body)

            if (response.status !== 200) {
                throw new Error(response.message)

            }


            //If theres no errors, set the updated study session to the new source
            const newSourceResponse = await getSourceById(this.props.studySessionSource._id)

            if (newSourceResponse.status !== 200) {
                throw new Error(newSourceResponse.message)

            }

            this.props.setStudySessionSource(newSourceResponse.data);


        } catch (error) {
            console.log(error)

        }

    }


    returnEditSourceJSX = () => {
        return (
            <div className='EditSource-Main'>
                <h3>Edit Source</h3>
                <br />

                {/* Set the new title of the source */}
                <label >{'Title'}</label>
                <br />

                <input
                    className="EditSource-Title-Input"
                    type="text"
                    value={`${this.props.tempSourceTitle}`}
                    onChange={(event) => { this.props.setTempSourceTitle(event.target.value) }}
                />
                <br />
                <br />


                {/* Set the description of the source */}
                <label >{'Description'}</label>
                <br />

                <textarea
                    className="EditSource-Description-TextArea"
                    type="text"
                    value={`${this.props.tempSourceDescription}`}
                    onChange={(event) => { this.props.setTempSourceDescription(event.target.value) }}

                />


                {/* Navigation buttons */}
                <div className='EditSource-NavButtons'>
                    <NavButton
                        NavButtonFloat="left"
                        NavButtonClick={this.handleClickCancel}
                        NavButtonText="Cancel"
                        NavButtonBGColor="red"
                    />

                    <NavButton
                        NavButtonFloat="right"
                        NavButtonClick={this.handleClickSave}
                        NavButtonText="Save"
                        NavButtonBGColor="green"
                    />
                </div>

            </div>

        )
    }


    render() {

        return (
            <span>
                {this.returnEditSourceJSX()}

            </span>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        currentMainAppComponent: state.currentMainAppComponent,
        studySessionSource: state.studySessionSource,
        currentStudyCard: state.currentStudyCard,
        tempSourceTitle: state.tempSourceTitle,
        tempSourceDescription: state.tempSourceDescription,
        returnToValue: state.returnToValue

    }
}


export default connect(mapStateToProps,
    {
        setTempSourceTitle: setTempSourceTitle,
        setTempSourceDescription: setTempSourceDescription,
        setCurrentMainAppComponent: setCurrentMainAppComponent,
        setStudySessionSource: setStudySessionSource,
        setEditDataMainType: setEditDataMainType

    })(EditSource)