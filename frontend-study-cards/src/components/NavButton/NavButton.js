import React, { Component } from 'react';
import './NavButton.css';


class NavButton extends Component {

    setNavColor = (inputColor) => {
        if (inputColor === 'red') {
            return '#DD1111'
        } else if (inputColor === 'green') {
            return '#11DD11'
        } else {
            return 'inherit'
        }
    }


    render() {

        return (
            <button
                className='NavButton-Button'
                style={{ float: `${this.props.NavButtonFloat}`, backgroundColor: `${this.setNavColor(this.props.NavButtonBGColor)}` }}
                onClick={this.props.NavButtonClick}
            >
                {this.props.NavButtonText}
            </button>
        )
    }
}

export default NavButton;