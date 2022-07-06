import React, { Component } from "react";
import './searchbar.css'


class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultSearchValue: 'Enter Source, Course or Subject',
            searchBarValue: 'Enter Source, Course or Subject'

        }
    }

    whenFocused = () => {
        if (this.state.defaultSearchValue === this.state.searchBarValue) {
            this.setState({ searchBarValue: '' })
        }

    }

    whenMouseLeave = () => {
        if (this.state.searchBarValue.trim() === '') {
            this.setState({ searchBarValue: this.state.defaultSearchValue })
        }
    }

    handleSearchChange = (e) => {
        this.setState({ searchBarValue: e.currentTarget.value })
    }

    render() {

        return (
            <div className="searchbar">
                <div className="searchbar-button">S</div>
                <input
                    className="searchbar-input"
                    type="text"
                    onFocus={this.whenFocused}
                    onPointerLeave={this.whenMouseLeave}
                    onMouseEnter={this.whenFocused}
                    onChange={this.handleSearchChange}
                    value={this.state.searchBarValue} />

            </div>
        )
    }
}

export default SearchBar;