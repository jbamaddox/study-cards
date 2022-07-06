import './addSource.css';
import { setTempSourceTitle, setTempSourceDescription, setTempSourceTypeId, setCurrentMainAppComponent, setSelectedSource, setAddDataMainType } from '../../actionCreators/actionCreators.js'
import { connect } from 'react-redux';
import React, { Component } from 'react';
import NavButton from '../NavButton/NavButton.js';
import { getSourceById, createNewSource } from '../../routeFunctions/routeFunctions.js';


class AddSource extends Component {
    componentDidMount() {
        this.props.setTempSourceTitle('');
        this.props.setTempSourceDescription('');
        this.props.setTempSourceTypeId(2);

    }

    handleClickCancel = async () => {
        /* Reset the Temp Title & Description, then navigate back to "Home" */
        this.props.setTempSourceTitle(null);
        this.props.setTempSourceDescription(null);
        this.props.setAddDataMainType(null);
        this.props.setCurrentMainAppComponent(this.props.returnToValue);

    }


    handleClickSave = async () => {

        try {
            //Set body of source to set
            const body = {
                title: this.props.tempSourceTitle,
                description: this.props.tempSourceDescription,
                subjects: [],
                createdByUserId: 0,
                typeId: this.props.tempSourceTypeId,
                image_url: ""
            }


            //Update source and log any error 
            const result = await createNewSource(body)

            if (result.status !== 200) {
                throw new Error(result.message)
            }


            //If theres no errors, set the newly created source to the selected source then change over to edit source component
            const newSourceResponse = await getSourceById(result.data._id)

            if (newSourceResponse.status !== 200) {
                throw new Error(newSourceResponse.message)
            }

            this.props.setSelectedSource(newSourceResponse.data);

            this.props.setAddDataMainType("Add Card");


        } catch (error) {
            console.log(error)

        }
    }


    sourceTypeOptions = () => {
        if (this.props.sourceTypes !== null /*&& this.props.sourceTypes.length > 0 */) {

            return this.props.sourceTypes.map((sourceType) => {

                if (sourceType.typeName !== 'All') {
                    return (
                        <option
                            key={this.props.sourceTypes.indexOf(sourceType)}
                            id={sourceType.typeId}
                            value={sourceType.typeId}
                            selected={sourceType.typeId === this.props.tempSourceTypeId ? true : false}
                        >{sourceType.typeName}</option >

                    )

                } else {
                    return null

                }

            })
        }
    }


    returnAddSourceJSX = () => {
        return (
            <div className='AddSource-Main'>
                <h3>Add Source</h3>
                <br />


                {/* Set the new title of the source */}
                <label >{'Title'}</label>
                <br />
                <input
                    className="AddSource-Title-Input"
                    type="text"
                    value={`${this.props.tempSourceTitle}`}
                    onChange={(event) => { this.props.setTempSourceTitle(event.target.value) }}
                />
                <br />
                <br />


                {/* Set the source type */}
                <div style={{ width: "100%" }}>

                    <label style={{ marginRight: "10px" }}>{'Source type'}</label>
                    <select onChange={(event) => this.props.setTempSourceTypeId(event.target.value)}>
                        {this.sourceTypeOptions()}
                    </select>

                </div>
                <br />


                {/* Set the image to upload */}
                <div style={{ width: "100%" }}>
                    <label style={{ marginRight: "10px" }} >{'Source Image'}</label>
                    {/* <input type="file" accept="image/png, image/jpeg, image/jpeg" onInput={(event) => { console.log(event.target.value) }} /> */}

                </div>
                <br />
                <br />


                {/* Set the description of the source */}
                <label >{'Description'}</label>
                <br />
                <textarea
                    className="AddSource-Description-TextArea"
                    type="text"
                    value={`${this.props.tempSourceDescription}`}
                    onChange={(event) => { this.props.setTempSourceDescription(event.target.value) }}

                />


                {/* Navigation buttons */}
                <div className='AddSource-NavButtons'>
                    <NavButton
                        NavButtonFloat="left"
                        NavButtonClick={this.handleClickCancel}
                        NavButtonText="Cancel"
                        NavButtonBGColor="red"
                    />

                    <NavButton
                        NavButtonFloat="right"
                        NavButtonClick={this.handleClickSave}
                        NavButtonText="Create"
                        NavButtonBGColor="green"
                    />
                </div>

            </div>

        )
    }


    render() {

        return (this.returnAddSourceJSX())
    }
}


const mapStateToProps = (state) => {
    return {
        currentMainAppComponent: state.currentMainAppComponent,
        tempSourceTitle: state.tempSourceTitle,
        tempSourceDescription: state.tempSourceDescription,
        tempSourceTypeId: state.tempSourceTypeId,
        returnToValue: state.returnToValue,
        selectedSource: state.selectedSource,
        sourceTypes: state.sourceTypes

    }
}


export default connect(mapStateToProps,
    {
        setTempSourceTitle: setTempSourceTitle,
        setTempSourceDescription: setTempSourceDescription,
        setTempSourceTypeId: setTempSourceTypeId,
        setCurrentMainAppComponent: setCurrentMainAppComponent,
        setAddDataMainType: setAddDataMainType,
        setSelectedSource: setSelectedSource

    })(AddSource)
