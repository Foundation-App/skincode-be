const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
  



app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use(require('cookie-parser')());


const imageUrl = require('../lib/utils/clarifai');

app.get('/test', (req, res) => {res.json('success')})
app.post('/imageurl', (req, res) => {imageUrl.handleAPICall(req, res)})
app.use('/api/v1/auth', require('./controllers/auth')); 
app.use('/api/v1/users', require('./controllers/users'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

