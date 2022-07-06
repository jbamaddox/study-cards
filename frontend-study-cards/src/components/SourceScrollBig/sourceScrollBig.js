import React, { Component } from "react";
import classImage from '../../images/stock-images/class.jpg';
import bookImage from '../../images/stock-images/book.jpg';
import moocImage from '../../images/stock-images/mooc.jpg';
import { connect } from 'react-redux';
import { setCurrentMainAppComponent, setSourceTypes, setCurrentSourceTypeId, setSources, setStudySessionSource } from '../../actionCreators/actionCreators.js';
import './SourceScrollBig.css';
import { getSourceTypes, getSources } from '../../routeFunctions/routeFunctions.js'


class SourceScrollBig extends Component {

    componentDidMount() {
        this.initializeSourceScrollBigData()

    }

    componentDidUpdate() {
        this.initializeSourceScrollBigData()

    }

    initializeSourceScrollBigData = async () => {

        try {
            //If there are no source types, get them from the database
            //Otherwise, set the sources (after the source types are set)
            if (this.props.sourceTypes === null) {
                const sourceTypesReturned = await getSourceTypes()

                if (sourceTypesReturned.status !== 200) {
                    throw new Error(sourceTypesReturned.message)
                }

                this.props.setSourceTypes(sourceTypesReturned.data)

            } else if (this.props.sources === null) {
                const sourcesReturned = await getSources()

                if (sourcesReturned.status !== 200) {
                    throw new Error(sourcesReturned.message)
                }

                this.props.setSources(sourcesReturned.data)

            }

        } catch (error) {
            console.log(error)

        }

    }

    //Function to set the default image for a course if there is no url for an image
    setItemImage = (item) => {
        let setImage = "";

        if (item.url) {
            setImage = item.url;
        } else {
            switch (item.type) {
                case 'Book':
                    setImage = bookImage;
                    break;
                case 'Class':
                    setImage = classImage;
                    break;
                case 'MOOC':
                    setImage = moocImage;
                    break;
                default:
                    setImage = classImage;
            }
        }

        return setImage

    }


    handleSourceClick = (source) => {
        this.props.setStudySessionSource(source);
        this.props.setCurrentMainAppComponent('StudySession');

    }


    render() {

        //Set the mapped list of source types
        let mappedSourceTypes = null
        if (this.props.sourceTypes !== null) {
            mappedSourceTypes = this.props.sourceTypes.map(sourceType => {

                return (
                    <button
                        className={this.props.currentSourceTypeId === sourceType.typeId ? "SourceScrollBig-selector-selected" : "SourceScrollBig-selector-notSelected"}
                        key={this.props.sourceTypes.indexOf(sourceType)}
                        onClick={() => { this.props.setCurrentSourceTypeId(sourceType.typeId) }}
                    ><b>{sourceType.typeName}</b>
                    </button >
                )

            })
        }





        //Set the mapped List of study sources
        let mappedSources = null
        if (this.props.sources !== null) {
            mappedSources = this.props.sources.map(source => {

                if (this.props.currentSourceTypeId === 0 || source.typeId === this.props.currentSourceTypeId) {
                    return (
                        <button
                            className="SourceScrollBig-button"
                            key={this.props.sources.indexOf(source)}
                            onClick={() => { this.handleSourceClick(source) }} >

                            <img className="SourceScrollBig-button-image" src={this.setItemImage(source)} alt="nothing here" />
                            <p style={{ maxHeight: "16px" }}><b>{source.title}</b></p>
                            <br />
                            <p style={{ maxHeight: "30px" }}>{source.description}</p>

                        </button>
                    )
                }

                return null

            })
        }




        return (
            <div className="SourceScrollBig" >
                {/* Set the array of source types buttons */}
                <div className='SourceScrollBig-selector-group' style={{ marginBottom: "15px" }} >
                    {this.props.sources === null || this.props.sourceTypes === null ? null : mappedSourceTypes}
                </div>

                {/* Set the list of study sources */}
                {this.props.sources === null || this.props.sources.length === undefined ? 'You do not have any study sources' : mappedSources}
            </div >
        )
    }
}


const mapStateToProps = (state) => {
    return {
        sourceTypes: state.sourceTypes,
        currentSourceTypeId: state.currentSourceTypeId,
        sources: state.sources,
        studySessionSource: state.studySessionSource,
        returnToValue: state.returnToValue

    }
}


export default connect(
    mapStateToProps,
    {
        setCurrentMainAppComponent: setCurrentMainAppComponent,
        setSourceTypes: setSourceTypes,
        setCurrentSourceTypeId: setCurrentSourceTypeId,
        setSources: setSources,
        setStudySessionSource: setStudySessionSource

    }
)(SourceScrollBig);
