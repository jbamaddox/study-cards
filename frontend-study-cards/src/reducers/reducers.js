import { combineReducers } from "redux";

const setCurrentMainAppComponent = (defaultMainComponent = 'Home', action) => {
    if (action.type === 'SET_MAIN_APP') {
        return action.payload
    }

    return defaultMainComponent;
}

const setCurrentSourceTypeId = (defaultCurrentSourceTypeId = 0, action) => {
    if (action.type === 'SET_SOURCE_TYPE_ID') {
        return action.payload

    }

    return defaultCurrentSourceTypeId
}

const setSourceTypes = (defaultSources = null, action) => {
    if (action.type === 'SET_SOURCE_TYPES') {
        return action.payload
    }

    return defaultSources
}

const setSources = (defaultSources = null, action) => {
    if (action.type === 'SET_SOURCES') {
        return action.payload
    }

    return defaultSources
}

const setStudySessionSource = (defaultSource = null, action) => {
    if (action.type === 'SET_CURRENT_SOURCE') {
        return action.payload
    }

    return defaultSource
}

const setSessionStudyCards = (defaultStudyCards = null, action) => {
    if (action.type === 'SET_SESSION_STUDY_CARDS') {
        return action.payload
    }

    return defaultStudyCards
}

const setCurrentStudyCard = (defaultStudyCard = null, action) => {
    if (action.type === 'SET_CURRENT_STUDYCARD') {
        return action.payload
    }

    return defaultStudyCard
}

const setTempSourceTitle = (defaultSourceTitle = null, action) => {
    if (action.type === 'SET_TEMP_SOURCE_TITLE') {
        return action.payload
    }

    return defaultSourceTitle
}

const setTempSourceDescription = (defaultDescription = null, action) => {
    if (action.type === 'SET_TEMP_DESCRIPTION') {
        return action.payload
    }

    return defaultDescription
}


const setTempSourceTypeId = (defaultSourceType = 1, action) => {
    if (action.type === 'SET_TEMP_SOURCETYPE') {
        return action.payload
    }

    return defaultSourceType

}

const setEditDataMainType = (defaultEditDataMainType = null, action) => {
    if (action.type === 'SET_EDIT_DATA_TYPE') {
        return action.payload
    }

    return defaultEditDataMainType
}

const setTempStudyCardQuestion = (defaultTempStudyCardQuestion = null, action) => {
    if (action.type === 'SET_TEMP_CARD_QUESTION') {
        return action.payload
    }

    return defaultTempStudyCardQuestion
}

const setTempStudyCardAnswer = (defaultTempStudyCardAnswer = null, action) => {
    if (action.type === 'SET_TEMP_CARD_ANSWER') {
        return action.payload
    }

    return defaultTempStudyCardAnswer
}


const setReturnToValue = (defaultReturnTo = null, action) => {
    if (action.type === 'SET_RETURN_TO_VALUE') {
        return action.payload
    }

    return defaultReturnTo
}

const setSelectedSource = (defaultSelectedSource = null, action) => {
    if (action.type === 'SET_SELECTED_SOURCE') {
        return action.payload
    }

    return defaultSelectedSource
}

const setAddDataMainType = (defaultAddDataMaintype = null, action) => {
    if (action.type === 'SET_ADD_DATA_MAIN_TYPE') {
        return action.payload
    }

    return defaultAddDataMaintype
}




export default combineReducers({
    currentMainAppComponent: setCurrentMainAppComponent,
    sourceTypes: setSourceTypes,
    currentSourceTypeId: setCurrentSourceTypeId,
    sources: setSources,
    studySessionSource: setStudySessionSource,
    currentSessionStudyCards: setSessionStudyCards,
    currentStudyCard: setCurrentStudyCard,
    tempSourceTitle: setTempSourceTitle,
    tempSourceDescription: setTempSourceDescription,
    tempSourceTypeId: setTempSourceTypeId,
    editDataMainType: setEditDataMainType,
    tempStudyCardQuestion: setTempStudyCardQuestion,
    tempStudyCardAnswer: setTempStudyCardAnswer,
    returnToValue: setReturnToValue,
    selectedSource: setSelectedSource,
    addDataMainType: setAddDataMainType
});
