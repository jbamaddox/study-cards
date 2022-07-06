const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const sourcesSchema = new mongoose.Schema({
    title: String,
    description: String,
    image_url: String,
    subjects: Array,
    createdByUserId: Number,
    typeId: Number,
    sourceId: Number
})

const SourceModel = mongoose.model('sources', sourcesSchema)


createSource = async (body) => {


    const newSource = new SourceModel({
        title: body.title,
        description: body.description,
        image_url: null,
        subjects: body.subjects,
        createdByUserId: body.createdByUserId,
        typeId: body.typeId
    })

    const result = await newSource.save();

    return result

}


getSources = async () => {
    const getSources = await SourceModel
        .find()

    return getSources
}


getSingleSource = async (sourceID) => {
    const getSingleSource = await SourceModel.findById(sourceID)

    return getSingleSource
}


updateSourceInfo = async (sourceID, sourceObject) => {

    try {
        const updatedsource = await SourceModel.findByIdAndUpdate(
            sourceID,
            {
                title: sourceObject.title,
                description: sourceObject.description

            }
        )

        return updatedsource

    } catch (err) {

        console.log('sources: updateSourceInfo')
        console.log(err)

    }
}


router.get('/', async (req, res) => {
    try {
        const sources = await getSources()

        res.status(200).send(sources);

    } catch (err) {
        console.log('sources: get:/')
        console.log(err)

        res.status(500).send('An error has occured')

    }
})


router.post('/', async (req, res) => {
    try {
        const newSource = await createSource(req.body)

        res.status(200).send(newSource);

    } catch (err) {
        console.log('sources: post:/')
        console.log(err)

    }
})


router.get('/:sourceID', async (req, res) => {
    try {
        const source = await getSingleSource(req.params.sourceID)

        res.status(200).send(source);

    } catch (err) {
        console.log('sources: get:/:sourceID')
        console.log(err)

        res.status(500).send('An error has occured')

    }
})


router.put('/:sourceID', async (req, res) => {
    try {
        const updatedSource = await updateSourceInfo(req.params.sourceID, req.body);

        res.status(200).send(updatedSource);

    } catch (err) {
        console.log('sources: put:/:sourceID')
        console.log(err)

        res.status(500).send('An error has occured')
    }

})


module.exports = router;
