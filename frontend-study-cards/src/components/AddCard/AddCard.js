import './AddCard.css';
import { setTempStudyCardQuestion, setTempStudyCardAnswer, setCurrentMainAppComponent, setAddDataMainType, setEditDataMainType, setCurrentStudyCard, setSessionStudyCards } from '../../actionCreators/actionCreators.js'
import { connect } from 'react-redux';
import React, { Component } from 'react';
import NavButton from '../NavButton/NavButton.js';
import { createNewStudyCard, getStudyCardsForSession } from '../../routeFunctions/routeFunctions.js';


class AddCard extends Component {

    componentDidMount() {
        this.props.setTempStudyCardQuestion('');
        this.props.setTempStudyCardAnswer('');

    }


    handleClickCancel = async () => {
        /* Reset the Temp Question & Answer */
        this.props.setTempStudyCardQuestion(null);
        this.props.setTempStudyCardAnswer(null);
        this.props.setAddDataMainType(null);
        this.props.setCurrentMainAppComponent(this.props.returnToValue);

    }


    handleClickSave = async () => {

        try {
            //create the new study card
            const body = {
                question: this.props.tempStudyCardQuestion,
                answer: this.props.tempStudyCardAnswer,
                sourceId: this.props.sourceId
            }

            const newStudyCardResponse = await createNewStudyCard(body)

            if (newStudyCardResponse.status !== 200) {
                throw new Error(newStudyCardResponse.message)

            }


            //update my study cards
            const studyCardResponse = await getStudyCardsForSession(this.props.sourceId)

            if (studyCardResponse.status !== 200) {
                throw new Error(studyCardResponse.message)
            }

            this.props.setSessionStudyCards(studyCardResponse.data)

            this.handleClickCancel()


        } catch (err) {
            console.log(err)

        }
    }


    returnAddCardJSX = () => {
        if (this.props.sourceId !== null) {

            return (
                <div className='AddCard-Main'>
                    <h3>Add Card</h3>
                    <br />


                    {/* Question & question textbox */}
                    <label >{'Question'}</label>
                    <br />
                    <textarea
                        className="AddCard-Question-TextArea"
                        type="text"
                        value={`${this.props.tempStudyCardQuestion}`}
                        onChange={(event) => this.props.setTempStudyCardQuestion(event.target.value)}

                    />
                    <br />
                    <br />


                    {/*Answer textbox */}
                    <label >{'Answer'}</label>
                    <br />
                    <textarea
                        className="AddCard-Answer-TextArea"
                        type="text"
                        value={`${this.props.tempStudyCardAnswer}`}
                        onChange={(event) => this.props.setTempStudyCardAnswer(event.target.value)}

                    />


                    {/* Cancel and Save Navigation buttons */}
                    <div className='AddCard-NavButtons'>

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

        } else {
            return null

        }
    }


    render() {

        return (this.returnAddCardJSX())

    }
}


AddCard.defaultProps = {
    sourceId: null  //this.props.studySessionSource (for adding to existing study sources) or this.props.selectedSource (for new study sources)

}


const mapStateToProps = (state) => {
    return {
        currentMainAppComponent: state.currentMainAppComponent,
        studySessionSource: state.studySessionSource,
        currentSessionStudyCards: state.currentSessionStudyCards,
        currentStudyCard: state.currentStudyCard,
        tempStudyCardQuestion: state.tempStudyCardQuestion,
        tempStudyCardAnswer: state.tempStudyCardAnswer,
        returnToValue: state.returnToValue,
        selectedSource: state.selectedSource

    }
}


export default connect(mapStateToProps,
    {
        setTempStudyCardQuestion: setTempStudyCardQuestion,
        setTempStudyCardAnswer: setTempStudyCardAnswer,
        setCurrentMainAppComponent: setCurrentMainAppComponent,
        setAddDataMainType: setAddDataMainType,
        setCurrentStudyCard: setCurrentStudyCard,
        setSessionStudyCards: setSessionStudyCards,
        setEditDataMainType: setEditDataMainType

    })(AddCard)
