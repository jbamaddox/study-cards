
export const setCurrentMainAppComponent = (mainAppComponent) => {
    return {
        type: 'SET_MAIN_APP',
        payload: mainAppComponent
    }

}


export const setSourceTypes = (sourceTypes) => {
    return {
        type: 'SET_SOURCE_TYPES',
        payload: sourceTypes
    }

}


export const setCurrentSourceTypeId = (sourctTypeId) => {
    return {
        type: 'SET_SOURCE_TYPE_ID',
        payload: sourctTypeId
    }

}


export const setSources = (sourceList) => {
    return {
        type: 'SET_SOURCES',
        payload: sourceList
    }

}


export const setStudySessionSource = (source) => {
    return {
        type: 'SET_CURRENT_SOURCE',
        payload: source
    }
}


export const setSessionStudyCards = (studyCards) => {
    return {
        type: 'SET_SESSION_STUDY_CARDS',
        payload: studyCards
    }
}


export const setCurrentStudyCard = (studyCard) => {
    return {
        type: 'SET_CURRENT_STUDYCARD',
        payload: studyCard
    }
}


export const setTempSourceTitle = (tempSourceTitle) => {
    return {
        type: 'SET_TEMP_SOURCE_TITLE',
        payload: tempSourceTitle
    }
}


export const setTempSourceDescription = (tempDescription) => {
    return {
        type: 'SET_TEMP_DESCRIPTION',
        payload: tempDescription
    }
}

export const setTempSourceTypeId = (tempSourceType) => {
    return {
        type: 'SET_TEMP_SOURCETYPE',
        payload: tempSourceType
    }
}


export const setEditDataMainType = (editDataType) => {
    return {
        type: 'SET_EDIT_DATA_TYPE',
        payload: editDataType
    }
}


export const setTempStudyCardQuestion = (tempCardQuestion) => {
    return {
        type: 'SET_TEMP_CARD_QUESTION',
        payload: tempCardQuestion
    }
}


export const setTempStudyCardAnswer = (tempCardAnswer) => {
    return {
        type: 'SET_TEMP_CARD_ANSWER',
        payload: tempCardAnswer
    }
}


export const setReturnToValue = (returnToValue) => {
    return {
        type: 'SET_RETURN_TO_VALUE',
        payload: returnToValue
    }
}

export const setSelectedSource = (selectedSource) => {
    return {
        type: 'SET_SELECTED_SOURCE',
        payload: selectedSource
    }
}

export const setAddDataMainType = (AddDataMainType) => {
    return {
        type: 'SET_ADD_DATA_MAIN_TYPE',
        payload: AddDataMainType
    }
}