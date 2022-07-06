import React, { Component } from 'react';
import SourceScrollBig from '../SourceScrollBig/sourceScrollBig.js';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {

        return (
            <div className="app-home">
                <h1>Study Card Application</h1>
                <p>Welcome to the home of the study card application. Select a book, course, or subject below</p>
                <SourceScrollBig />
            </div>
        )
    }
}

export default Home;