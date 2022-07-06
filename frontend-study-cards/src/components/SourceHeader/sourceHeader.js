import './sourceHeader.css';
import { setCurrentMainAppComponent, setEditDataMainType, setReturnToValue } from '../../actionCreators/actionCreators.js';
import React, { Component } from 'react';
import { connect } from 'react-redux';


class SourceHeader extends Component {

    returnHeaderButtons = () => {
        return this.props.buttonArray.map((button) => {
            return (
                <button
                    key={this.props.buttonArray.indexOf(button)}
                    className={this.props.buttonSelectedLinking === button ? 'SourceHeader-Button-Selected' : 'SourceHeader-Button-UnSelected'}
                    id={button}
                    onClick={(event) => { this.props.handleHeaderButtonClick(event.target.id) }}
                >
                    {button}
                </button>
            )
        })
    }


    render() {

        return (
            <div className='SourceHeader'>
                <p style={{ float: "left", width: "35%", textAlign: "left", paddingLeft: "2%" }} >{`${this.props.headerText}`}</p>
                <div className='SourceHeader-buttons' style={{ float: "right", minWidth: `${this.props.buttonArray.length * 100}px` }}>
                    {this.returnHeaderButtons()}

                </div>

            </div>

        )
    }
}


SourceHeader.defaultProps = {
    headerText: '',
    buttonArray: [],
    buttonSelectedLinking: '',
    handleHeaderButtonClick: null
}


const mapStateToProps = (state) => {
    return {
        currentMainAppComponent: state.currentMainAppComponent,
        studySessionSource: state.studySessionSource,
        currentStudyCard: state.currentStudyCard,
        editDataMainType: state.editDataMainType

    }
}


export default connect(mapStateToProps,
    {
        setCurrentMainAppComponent: setCurrentMainAppComponent,
        setEditDataMainType: setEditDataMainType,
        setReturnToValue: setReturnToValue

    })(SourceHeader)
