const mongoose = require('mongoose');
const keys = require('../keys.js');
const express = require('express');
const app = express();

connectToMongoDB = async () => {
    await mongoose.connect(`mongodb+srv://${keys.mongoUser}:${keys.mongoPW}@${keys.mongoDBCluster}?retryWrites=true&w=majority`)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => {
            console.log('Not Connected to the MongoDB', err)
            throw new Error(err);

        });

}


module.exports.connectToMongoDB = connectToMongoDB
