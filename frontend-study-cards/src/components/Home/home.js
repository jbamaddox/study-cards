import './home.css';
import React, { Component } from 'react';
import SourceScrollBig from '.././SourceScrollBig/sourceScrollBig.js';
import SourceHeader from '../SourceHeader/sourceHeader.js';
import { connect } from 'react-redux';
import { setAddDataMainType, setReturnToValue, setCurrentMainAppComponent } from '../../actionCreators/actionCreators.js'


class Home extends Component {

    navigateToStudySession = () => {
        if (this.props.currentStudySource === null) {
            return null
        } else {
            return (
                <button
                    className='navigateToStudySession-button'
                >{'Back to Study Session'}</button>
            )
        }
    }


    handleHeaderButtonClick = (idValue) => {
        //Set the value of the component to return
        if (this.props.currentMainAppComponent !== 'AddData') {
            this.props.setReturnToValue(this.props.currentMainAppComponent);

        }

        if (idValue === "Add Source") {
            this.props.setAddDataMainType(idValue);
            this.props.setCurrentMainAppComponent('AddData');

        }
    }


    render() {

        return (
            <div className="app-home">
                <SourceHeader
                    headerText=''
                    buttonArray={["Add Source"]}
                    buttonSelectedLinking={this.props.selectedSource}
                    handleHeaderButtonClick={this.handleHeaderButtonClick}
                />

                <SourceScrollBig />

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        currentMainAppComponent: state.currentMainAppComponent,
        currentStudySource: state.currentStudySource,
        selectedSource: state.selectedSource
    }
}


export default connect(
    mapStateToProps,
    {
        setAddDataMainType: setAddDataMainType,
        setReturnToValue: setReturnToValue,
        setCurrentMainAppComponent: setCurrentMainAppComponent
    })(Home);
