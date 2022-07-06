import './addData.css';
import { setTempSourceTitle, setTempSourceDescription, setCurrentMainAppComponent, setStudySessionSource, setAddDataMainType, setReturnToValue } from '../../actionCreators/actionCreators.js'
import { connect } from 'react-redux';
import React, { Component } from 'react';
import SourceHeader from '../SourceHeader/sourceHeader.js';
import AddSource from '../AddSource/AddSource.js';
import AddCard from '../AddCard/AddCard.js';


class AddData extends Component {

    //Determine what data type you're going to be Adding
    returnAddDataJSX = () => {

        if (this.props.addDataMainType === 'Add Source') {
            return <AddSource />

        } else if (this.props.addDataMainType === 'Add Card') {
            return <AddCard sourceId={this.props.selectedSource._id} />

        }
    }


    handleHeaderButtonClick = (idValue) => {
        //Set the value of the component to return
        if (this.props.currentMainAppComponent !== 'AddData') {
            this.props.setReturnToValue(this.props.currentMainAppComponent);

        }

        this.props.setAddDataMainType(idValue);

        if (idValue === "Add Sourse") {
            this.props.setCurrentMainAppComponent('AddData');

        } else if (idValue === "Add Card") {
            this.props.setCurrentMainAppComponent('AddData');

        }
    }


    render() {

        return (
            <div className='AddData'>
                <SourceHeader
                    headerText={'Create a new source'}
                    buttonArray={[]}
                    buttonSelectedLinking={this.props.addDataMainType}
                    handleHeaderButtonClick={this.handleHeaderButtonClick}
                />
                {this.returnAddDataJSX()}

            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        currentMainAppComponent: state.currentMainAppComponent,
        currentStudyCard: state.currentStudyCard,
        tempSourceTitle: state.tempSourceTitle,
        tempSourceDescription: state.tempSourceDescription,
        addDataMainType: state.addDataMainType,
        selectedSource: state.selectedSource

    }
}


export default connect(
    mapStateToProps,
    {
        setTempSourceTitle: setTempSourceTitle,
        setTempSourceDescription: setTempSourceDescription,
        setCurrentMainAppComponent: setCurrentMainAppComponent,
        setStudySessionSource: setStudySessionSource,
        setAddDataMainType: setAddDataMainType,
        setReturnToValue: setReturnToValue

    })(AddData)