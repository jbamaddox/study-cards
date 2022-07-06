const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const studyCardSchema = mongoose.Schema({
    studyCardId: Number,
    sourceId: ObjectId,
    question: String,
    answer: String
});

const StudyCardModel = mongoose.model('study-cards', studyCardSchema, 'study-cards');


getStudyCards = async () => {
    return await StudyCardModel.find();

}

getStudyCardsBySource = async (sourceID) => {
    return await StudyCardModel.find({ sourceId: `${sourceID}` });

}


getStudyCardsByCardId = async (cardId) => {
    return await StudyCardModel.find({ _id: cardId });
}

updateStudyCardsByCardId = async (cardId, body) => {
    return await StudyCardModel.findByIdAndUpdate(
        cardId,
        {
            question: body.question,
            answer: body.answer
        }
    )
}

createNewStudyCard = async (requestBody) => {
    const newStudyCard = await new StudyCardModel({
        sourceId: requestBody.sourceId,
        question: requestBody.question,
        answer: requestBody.answer
    })

    const result = await newStudyCard.save()

    return result

}


router.get('/', async (req, res) => {
    try {
        const studyCards = await getStudyCards()

        res.status(200).send(studyCards)

    } catch (err) {
        console.log('studycards: get:/')
        console.log(err)

        res.status(500).send('An error has occured')

    }

})


router.get('/:sourceid', async (req, res) => {
    try {
        const studyCards = await getStudyCardsBySource(req.params.sourceid)

        res.status(200).send(studyCards)

    } catch (err) {
        console.log('studycards: get:/:sourceid')
        console.log(err);

        res.status(500).send('An error has occured')

    }

})


router.get('/cardId/:cardId', async (req, res) => {
    try {
        const studyCard = await getStudyCardsByCardId(req.params.cardId)

        res.status(200).send(studyCard)

    } catch (err) {
        console.log('studycards: get:/cardId/:cardId')
        console.log(err);

        res.status(500).send('An error has occured')

    }

})


router.put('/cardId/:cardId', async (req, res) => {
    try {
        const studyCard = await updateStudyCardsByCardId(req.params.cardId, req.body)

        res.status(200).send(studyCard)

    } catch (err) {
        console.log('studycards: put:/cardId/:cardId')
        console.log(err);

        res.status(500).send('An error has occured')

    }

})

router.post('/', async (req, res) => {
    try {
        const newStudyCard = await createNewStudyCard(req.body);

        res.status(200).send(newStudyCard);

    } catch (error) {
        console.log('studycards: post:/')
        console.log(error);

        res.status(500).send('An error has occured')
    }
})

module.exports = router;