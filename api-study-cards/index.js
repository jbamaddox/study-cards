const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const { connectToMongoDB } = require('./apiExpress/setup.js');
const handleErrors = require('./apiExpress/handleErrors.js')
const helmet = require('helmet');
const setHeaders = require('./apiExpress/setHeaders.js');
const sourceTypes = require('./routes/sourceTypes.js');
const sources = require('./routes/sources.js');
const studyCards = require('./routes/studyCards.js');

connectToMongoDB();


app.use(setHeaders);
app.use(bodyParser.json());
app.use(helmet());

app.use('/api/sourceTypes', sourceTypes);
app.use('/api/sources', sources);
app.use('/api/studyCards', studyCards);
app.use(handleErrors);


const port = process.env.PORT || 4500;

app.listen(port, () => {
    console.log(`Listening on ${port}`)
});

