import React, { Component } from "react";
//import SearchBar from "../SearchBar/searchbar";
import { connect } from "react-redux";
import { setCurrentMainAppComponent, setEditDataMainType } from '../../actionCreators/actionCreators.js'
import TbyF from '../../images/logos/ThreeByFive.png'
import './appHeader.css';

class AppHeader extends Component {

    returnSearchButton = () => {
        return (
            <button
                className={this.props.currentMainAppComponent === 'Home' ? "header-NavTo-Button-Selected" : "header-NavTo-Button-NotSelected"}
                onClick={() => {
                    this.props.setEditDataMainType(null)
                    this.props.setCurrentMainAppComponent('Home')
                }}
            >{'Courses'}<br />{'& Sources'}</button>
        )

    }

    returnStudySessionButton = () => {
        if (this.props.studySessionSource !== null) {
            return (
                <button
                    className={this.props.studySessionSource !== null && this.props.currentMainAppComponent === 'StudySession' ? "header-NavTo-Button-Selected" : "header-NavTo-Button-NotSelected"}
                    onClick={() => { this.handleStudySessionClick() }}
                >{'Study'}< br />{'Session'}</button >
            )
        }

        return null

    }

    handleStudySessionClick = () => {
        this.props.setEditDataMainType(null);
        if (this.props.studySessionSource !== null && this.props.currentMainAppComponent === 'StudySession') {
            return null
        } else {
            this.props.setCurrentMainAppComponent('StudySession')
        }


    }


    returnEditDataButton = () => {
        let dataTypeText = ''

        if (this.props.editDataMainType === 'Add Source') {
            dataTypeText = 'Source'
        } else if (this.props.editDataMainType === 'Add Card') {
            dataTypeText = 'Card'
        } else {
            dataTypeText = 'Data'
        }

        if (this.props.currentMainAppComponent === "EditData") {
            return (
                <button
                    className={this.props.currentMainAppComponent === 'EditData' ? "header-NavTo-Button-Selected" : "header-NavTo-Button-NotSelected"}
                    onClick={null}
                >{'Editing'}< br />{dataTypeText}</button >
            )
        }

        return null

    }



    returnAddDataButton = () => {
        let dataTypeText = ''

        if (this.props.addDataMainType === 'Add Source') {
            dataTypeText = 'Source'
        } else if (this.props.addDataMainType === 'Add Card') {
            dataTypeText = 'Card'
        } else {
            dataTypeText = 'Data'
        }

        if (this.props.currentMainAppComponent === "AddData") {
            return (
                <button
                    className={this.props.currentMainAppComponent === 'AddData' ? "header-NavTo-Button-Selected" : "header-NavTo-Button-NotSelected"}
                    onClick={null}
                >{'Add'}< br />{dataTypeText}</button >
            )
        }

        return null

    }



    render() {

        return (
            <div className="header">
                <img className="header-logo" src={TbyF} alt="sc-logo" onClick={() => this.props.setCurrentMainAppComponent('Home')} />
                <div className="header-app-name" >{'Three By Five'}</div>
                {this.returnSearchButton()}
                {this.returnStudySessionButton()}
                {this.returnEditDataButton()}
                {this.returnAddDataButton()}
                {/*<SearchBar />*/}

            </div>

        )
    }
}


const mapStateToProps = (state) => {
    return {
        currentMainAppComponent: state.currentMainAppComponent,
        studySessionSource: state.studySessionSource,
        addDataMainType: state.addDataMainType,
        editDataMainType: state.editDataMainType
    }
}


export default connect(
    mapStateToProps,
    {
        setCurrentMainAppComponent: setCurrentMainAppComponent,
        setEditDataMainType: setEditDataMainType
    })(AppHeader);