import './editData.css';
import { setTempSourceTitle, setTempSourceDescription, setCurrentMainAppComponent, setStudySessionSource, setEditDataMainType, setReturnToValue } from '../../actionCreators/actionCreators.js'
import { connect } from 'react-redux';
import React, { Component } from 'react';
import SourceHeader from '../SourceHeader/sourceHeader.js';
import EditCourse from '../EditSource/editSource.js';
import EditCard from '../EditCard/editCard.js';
import AddCard from '../AddCard/AddCard';


class EditData extends Component {

    //Determine what data type you're going to be editing
    returnEditDataJSX = () => {
        if (this.props.editDataMainType === 'Edit Course') {
            return <EditCourse />

        } else if (this.props.editDataMainType === 'Edit Card') {
            return <EditCard />

        } else if (this.props.editDataMainType === 'Add Card') {
            return <AddCard sourceId={this.props.studySessionSource._id} />

        }
    }


    handleHeaderButtonClick = (idValue) => {
        //Set the value of the component to return
        if (this.props.currentMainAppComponent !== 'EditData') {
            this.props.setReturnToValue(this.props.currentMainAppComponent);

        }

        this.props.setEditDataMainType(idValue);

    }


    render() {

        return (
            <div className='EditData'>
                <SourceHeader
                    headerText={this.props.studySessionSource.title}
                    buttonArray={["Edit Course", "Edit Card", "Add Card"]}
                    buttonSelectedLinking={this.props.editDataMainType}
                    handleHeaderButtonClick={this.handleHeaderButtonClick}
                />
                {this.returnEditDataJSX()}

            </div>

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
        editDataMainType: state.editDataMainType

    }
}


export default connect(mapStateToProps,
    {
        setTempSourceTitle: setTempSourceTitle,
        setTempSourceDescription: setTempSourceDescription,
        setCurrentMainAppComponent: setCurrentMainAppComponent,
        setStudySessionSource: setStudySessionSource,
        setEditDataMainType: setEditDataMainType,
        setReturnToValue: setReturnToValue

    })(EditData)