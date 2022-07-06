import axios from 'axios';


export const updateStudyCard = async (currentStudyCardId, query) => {
    try {
        const studyCardResponse = await axios.put(`/api/studyCards/cardId/${currentStudyCardId}`, query)

        if (studyCardResponse.status !== 200) {
            throw new Error(studyCardResponse.message)
        }

        return studyCardResponse

    } catch (err) {
        console.log(err)

        return err

    }
}


export const updateSource = async (studySessionSourceId, query) => {
    try {
        const studySourceResponse = await axios.put(`/api/sources/${studySessionSourceId}`, query)

        if (studySourceResponse.status !== 200) {
            throw new Error(studySourceResponse.message)
        }

        return studySourceResponse

    } catch (err) {
        console.log(err)

        return err

    }
}


export const getSourceById = async (studySessionSourceID) => {
    try {
        const getSourceResponse = await axios.get(`/api/sources/${studySessionSourceID}`)

        if (getSourceResponse.status !== 200) {
            throw new Error(getSourceResponse.message)
        }

        return getSourceResponse

    } catch (err) {
        console.log(err.statusText)

        return err.statusText

    }
}


export const getStudyCardsForSession = async (studySessionSourceID) => {
    try {
        const studyCardsResponse = await axios.get(`/api/studyCards/${studySessionSourceID}`)

        if (studyCardsResponse.status !== 200) {
            throw new Error(studyCardsResponse.message)
        }

        return studyCardsResponse

    } catch (err) {
        console.log(err.statusText)

        return err

    }
}


export const getSourceTypes = async () => {
    try {
        const sourceTypesResponse = await axios.get(`/api/sourceTypes`)

        if (sourceTypesResponse.status !== 200) {
            throw new Error(sourceTypesResponse.message)
        }

        return sourceTypesResponse

    } catch (err) {
        console.log(err.statusText)

        return err

    }
}


export const getSources = async () => {
    try {
        const sourcesResponse = await axios.get(`/api/sources`)

        if (sourcesResponse.status !== 200) {
            throw new Error(sourcesResponse.message)
        }

        return sourcesResponse

    } catch (err) {
        console.log(err.statusText)

        return err
    }
}


export const createNewSource = async (postBody) => {
    try {
        const newSourceResponse = await axios.post(`/api/sources`, postBody)

        if (newSourceResponse.status !== 200) {
            throw new Error(newSourceResponse.message)
        }

        return newSourceResponse

    } catch (err) {
        console.log(err.statusText)

        return err
    }
}


export const createNewStudyCard = async (postbody) => {
    try {
        const newStudyCardResponse = await axios.post(`/api/studyCards`, postbody)

        if (newStudyCardResponse.status !== 200) {
            throw new Error(newStudyCardResponse.message)
        }

        return newStudyCardResponse

    } catch (err) {
        console.log(err.statusText);

        return err
    }
}
