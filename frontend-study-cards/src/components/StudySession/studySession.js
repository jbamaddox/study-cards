import './studySession.css'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentMainAppComponent, setSessionStudyCards, setCurrentStudyCard, setReturnToValue, setEditDataMainType } from '../../actionCreators/actionCreators.js';
import StudyCard from '../StudyCard/studyCard.js';
import SourceHeader from '../SourceHeader/sourceHeader';
import { getStudyCardsForSession } from '../../routeFunctions/routeFunctions.js';



class StudySession extends Component {
    constructor(props) {
        super(props)
        this.needStudyCards = 1;
        this.needInitialCard = 1

    }


    componentDidMount() {
        this.intializeSessionStudyCards(this.needStudyCards, this.needInitialCard)

    }


    componentDidUpdate() {
        this.intializeSessionStudyCards(this.needStudyCards, this.needInitialCard)

    }

    intializeSessionStudyCards = async (needStudyCards, needInitialCard) => {
        try {
            /*If the study session's study source is set 
            and the study session cards are not set ,

            or the study session cards are not from the same source as the current study session source, 

            then get new study session cards
            */

            if (needStudyCards === 1) {


                const sessionStudyCardsResponse = await getStudyCardsForSession(this.props.studySessionSource._id)

                if (sessionStudyCardsResponse.status !== 200) {
                    throw new Error(sessionStudyCardsResponse.message)
                }

                this.props.setSessionStudyCards(sessionStudyCardsResponse.data)
                this.needStudyCards = 0
                this.setInitialCard()


            } else if (needInitialCard === 1) {
                this.setInitialCard()
                this.needInitialCard = 0

            }

        } catch (error) {
            console.log(error)
        }

    }


    setInitialCard = () => {
        //Set the first card to show for the current study session
        if (this.props.currentSessionStudyCards !== null) {
            const initialStudyCard = Object.assign(
                this.props.currentSessionStudyCards[0],
                { currentCardIndex: 0 }
            )

            this.props.setCurrentStudyCard(initialStudyCard)

        }
    }


    setNextNewStudyCard = () => {
        let nextStudyCard = null

        //If the current study card is the last, set the next study card as the first study card in the list
        if (this.props.currentStudyCard.currentCardIndex === (this.props.currentSessionStudyCards.length - 1)) {
            this.setInitialCard()

        } else {
            nextStudyCard = Object.assign(
                this.props.currentSessionStudyCards[this.props.currentStudyCard.currentCardIndex + 1],
                { currentCardIndex: this.props.currentStudyCard.currentCardIndex + 1 }
            )

            this.props.setCurrentStudyCard(nextStudyCard)

        }
    }


    setPrevNewStudyCard = () => {
        let prevStudyCard = null

        //If the current study card is the first study card, set the first study card to the last study card
        if (this.props.currentStudyCard.currentCardIndex === 0) {
            prevStudyCard = Object.assign(
                this.props.currentSessionStudyCards[this.props.currentSessionStudyCards.length - 1],
                { currentCardIndex: this.props.currentSessionStudyCards.length - 1 }

            )

        } else {
            prevStudyCard = Object.assign(
                this.props.currentSessionStudyCards[this.props.currentStudyCard.currentCardIndex - 1],
                { currentCardIndex: this.props.currentStudyCard.currentCardIndex - 1 }

            )

        }

        this.props.setCurrentStudyCard(prevStudyCard)

    }


    handleHeaderButtonClick = (idValue) => {
        //Set the value of the component to return
        if (this.props.currentMainAppComponent !== 'EditData') {
            this.props.setReturnToValue(this.props.currentMainAppComponent);

        }

        //Set the type of data to edit/add
        this.props.setEditDataMainType(idValue);

        //Change the main component
        if (idValue === "Edit Course") {
            this.props.setCurrentMainAppComponent('EditData');

        } else if (idValue === "Edit Card") {
            this.props.setCurrentMainAppComponent('EditData');

        } else if (idValue === "Add Card") {
            this.props.setCurrentMainAppComponent('EditData');

        }
    }


    studySessionToReturn = () => {
        if (this.props.currentSessionStudyCards !== null && this.props.currentStudyCard !== null) {
            return (
                <span>
                    {/* Return next and previous buttons to nav through study cards */}
                    <div className='StudySession-PrevNext'>
                        <button
                            className='NextPrev-Button'
                            style={{ float: 'left' }}
                            onClick={this.setPrevNewStudyCard}
                        >{'Prev'}</button>

                        {this.props.currentStudyCard.currentCardIndex + 1}/{this.props.currentSessionStudyCards.length}

                        <button
                            className='NextPrev-Button'
                            style={{ float: 'right' }}
                            onClick={this.setNextNewStudyCard}
                        >{'Next'}</button>

                    </div>

                    {/*  Return the study card and answer */}
                    <StudyCard
                        studyCardQuestion={this.props.currentStudyCard.question}
                        studyCardAnswer={this.props.currentStudyCard.answer}
                        studyCardID={this.props.currentStudyCard._id}
                    />
                </span>)

        } else {
            return null

        }
    }


    render() {

        return (
            <div className='StudySession' >
                {/* Return header for source */}
                <SourceHeader
                    headerText={this.props.studySessionSource.title}
                    buttonArray={["Edit Course", "Edit Card", "Add Card"]}
                    buttonSelectedLinking={this.props.studySessionSource}
                    handleHeaderButtonClick={this.handleHeaderButtonClick}
                />
                {this.studySessionToReturn()}

            </div>

        )
    }
}


const mapStateToProps = (state) => {

    return {
        currentMainAppComponent: state.currentMainAppComponent,
        studySessionSource: state.studySessionSource,
        currentSessionStudyCards: state.currentSessionStudyCards,
        currentStudyCard: state.currentStudyCard,
        editDataMainType: state.editDataMainType
    }
}


export default connect(
    mapStateToProps,
    {
        setCurrentMainAppComponent: setCurrentMainAppComponent,
        setSessionStudyCards: setSessionStudyCards,
        setCurrentStudyCard: setCurrentStudyCard,
        setReturnToValue: setReturnToValue,
        setEditDataMainType: setEditDataMainType

    })(StudySession);
