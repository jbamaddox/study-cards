import React, { Component } from 'react';
import './App.css';
import AppHeader from '../App-Header/appHeader.js';
import MainApp from '../MainApp/mainApp.js';


class App extends Component {

  render() {

    return (
      <div className="App">
        <AppHeader />
        <MainApp />

      </div>
    )

  }
}


export default App;
