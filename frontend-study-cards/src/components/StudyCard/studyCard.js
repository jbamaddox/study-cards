import React, { Component } from 'react'
import './studyCard.css'

class StudyCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showHideAnswer: 'HIDE',
            studyCardID: this.props.studyCardID
        }
    }


    componentDidUpdate() {
        if (this.state.showHideAnswer === 'SHOW' && this.state.studyCardID !== this.props.studyCardID) {
            this.setState({ showHideAnswer: 'HIDE', studyCardID: this.props.studyCardID })
        }
    }

    toggleShowHideAnswer = () => {
        if (this.state.showHideAnswer === 'SHOW') {
            this.setState({ showHideAnswer: 'HIDE' })
        } else {
            this.setState({ showHideAnswer: 'SHOW' })
        }
    }

    render() {

        return (
            <div className='StudySession-StudyCard'>

                {/* Question */}
                <div className='StudySession-StudyCard-Question'>
                    <h4>Question</h4>
                    {this.props.studyCardQuestion}
                </div>

                {/* Answer */}
                <div className={this.state.showHideAnswer === 'SHOW' ? "StudySession-StudyCard-Answer-Show" : "StudySession-StudyCard-Answer-Hide"}>
                    <button
                        className={this.state.showHideAnswer === 'SHOW' ? "StudySession-StudyCard-Answer-Button-Show" : "StudySession-StudyCard-Answer-Button-Hide"}
                        onClick={this.toggleShowHideAnswer}
                    >
                        {this.state.showHideAnswer === 'SHOW' ? "Hide Answer" : "Show Answer"}
                    </button>
                    <br />
                    {this.state.showHideAnswer === 'SHOW' ? this.props.studyCardAnswer : null}
                </div>
            </div>
        )
    }
}

export default StudyCard