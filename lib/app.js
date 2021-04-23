const express = require('express');
const app = express();

app.use(express.json());

const imageUrl = require('../lib/utils/clarifai');


app.get('/', (req, res) => {res.send('success')})
app.post('/imageurl', (req, res) => {imageUrl.handleAPICall(req, res)})

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

