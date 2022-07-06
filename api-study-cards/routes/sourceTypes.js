const { ObjectId } = require('bson');
const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();


const sourceTypeSchema = new mongoose.Schema({
    typeId: Number,
    typeName: String
});

const SourceType = mongoose.model('source-types', sourceTypeSchema);

getSourceTypes = async () => {
    return await SourceType
        .find({})
        .select({ typeName: 1, typeId: 1 })
        .sort({ typeId: 1 })

}


router.get('/', async (req, res) => {
    try {
        const sourceTypes = await getSourceTypes()

        res.send(sourceTypes)


    } catch (err) {
        console.log(err)

        res.status(500).send('An error has occured');

    }


})

module.exports = router;