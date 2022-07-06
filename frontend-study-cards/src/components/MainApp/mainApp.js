import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentMainAppComponent } from '../../actionCreators/actionCreators.js';
import Home from '../Home/home.js'
import StudySession from '../StudySession/studySession.js';
import EditData from '../EditData/editData.js';
import AddData from '../AddData/AddData.js';


class MainApp extends Component {

    applicationToReturn = () => {

        if (this.props.currentMainAppComponent === 'Home') {
            return <Home />
        } else if (this.props.currentMainAppComponent === 'StudySession') {
            return <StudySession />
        } else if (this.props.currentMainAppComponent === 'EditData') {
            return <EditData />
        } else if (this.props.currentMainAppComponent === 'AddData') {
            return <AddData />
        } else {
            return null
        }

    }


    render() {
        return (
            <div>
                {this.applicationToReturn()}
            </div>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        currentMainAppComponent: state.currentMainAppComponent
    }
}

export default connect(mapStateToProps, { setCurrentMainAppComponent: setCurrentMainAppComponent })(MainApp)