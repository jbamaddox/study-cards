import './editCard.css';
import { setTempStudyCardQuestion, setTempStudyCardAnswer, setCurrentMainAppComponent, setEditDataMainType, setCurrentStudyCard, setSessionStudyCards } from '../../actionCreators/actionCreators.js'
import { connect } from 'react-redux';
import React, { Component } from 'react';
import NavButton from '../NavButton/NavButton.js';
import { updateStudyCard } from '../../routeFunctions/routeFunctions.js'


class EditCard extends Component {

    componentDidMount() {
        this.props.setTempStudyCardQuestion(this.props.currentStudyCard.question);
        this.props.setTempStudyCardAnswer(this.props.currentStudyCard.answer);

    }


    componentDidUpdate() {
    }


    handleClickCancel = async () => {
        /* Reset the Temp Question & Answer */
        this.props.setTempStudyCardQuestion(null);
        this.props.setTempStudyCardAnswer(null);
        this.props.setEditDataMainType(null);
        this.props.setCurrentMainAppComponent(this.props.returnToValue)

    }


    handleClickSave = async () => {

        try {
            //update the study card based on its ID
            const query = {
                question: this.props.tempStudyCardQuestion,
                answer: this.props.tempStudyCardAnswer
            }

            const updatedCardResponse = await updateStudyCard(this.props.currentStudyCard._id, query)

            if (updatedCardResponse.status !== 200) {
                throw new Error(updatedCardResponse.message)

            }


            //Set new study card
            let tempCurrentStudyCard = Object.assign(this.props.currentStudyCard)

            tempCurrentStudyCard.question = this.props.tempStudyCardQuestion;
            tempCurrentStudyCard.answer = this.props.tempStudyCardAnswer;


            //Set study card list
            let tempStudyCards = this.props.currentSessionStudyCards.map((studyCard) => {
                if (tempCurrentStudyCard._id === studyCard._id) {
                    return tempCurrentStudyCard
                } else {
                    return studyCard
                }

            })

            //Update Study cards and current study card
            this.props.setSessionStudyCards(tempStudyCards);
            this.props.setCurrentStudyCard(Object.assign(tempCurrentStudyCard));


        } catch (err) {
            console.log(err)

        }
    }


    returnEditCardJSX = () => {
        return (
            <div className='EditCard-Main'>
                <h3>Edit Card</h3>
                <br />

                {/* Question & question textbox */}
                <label >{'Question'}</label>
                <br />
                <textarea
                    className="EditCard-Question-TextArea"
                    type="text"
                    value={`${this.props.tempStudyCardQuestion}`}
                    onChange={(event) => { this.props.setTempStudyCardQuestion(event.target.value) }}

                />
                <br />
                <br />

                {/*Answer textbox */}
                <label >{'Answer'}</label>
                <br />
                <textarea
                    className="EditCard-Answer-TextArea"
                    type="text"
                    value={`${this.props.tempStudyCardAnswer}`}
                    onChange={(event) => { this.props.setTempStudyCardAnswer(event.target.value) }}

                />

                {/* Cancel and Save Navigation buttons */}
                <div className='EditCard-NavButtons'>

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
                {this.returnEditCardJSX()}
            </span>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        currentMainAppComponent: state.currentMainAppComponent,
        studySessionSource: state.studySessionSource,
        currentSessionStudyCards: state.currentSessionStudyCards,
        currentStudyCard: state.currentStudyCard,
        tempStudyCardQuestion: state.tempStudyCardQuestion,
        tempStudyCardAnswer: state.tempStudyCardAnswer,
        returnToValue: state.returnToValue

    }
}


export default connect(mapStateToProps,
    {
        setTempStudyCardQuestion: setTempStudyCardQuestion,
        setTempStudyCardAnswer: setTempStudyCardAnswer,
        setCurrentMainAppComponent: setCurrentMainAppComponent,
        setEditDataMainType: setEditDataMainType,
        setCurrentStudyCard: setCurrentStudyCard,
        setSessionStudyCards: setSessionStudyCards

    })(EditCard)
