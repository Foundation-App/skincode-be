const express = require('express');
const app = express();
const cors = require('cors');
const ensureAuth = require('./middleware/ensure-auth');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');



app.use(require('cors')({
    origin: true,
    credentials: true
  }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

const imageUrl = require('../lib/utils/clarifai');

app.use('/api', ensureAuth);

app.get('/', (req, res) => {
    res.json('you are at 7893');
  });

app.get('/test', (req, res) => {
  res.json('success');
});
app.post('/imageurl', (req, res) => {
  imageUrl.handleAPICall(req, res);
});

app.post('/api/imageurl', (req, res) => {
  imageUrl.handleAPICall(req, res);
});

app.use('/auth', require('./controllers/auth'));//(signup/login)
app.use('/api/users', require('./controllers/users'));
app.use('/api/favorites', require('./controllers/favorites'));
app.use('/api/cloudinary', require('./controllers/cloudinary'));




app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
