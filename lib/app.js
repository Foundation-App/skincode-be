const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan');
const ensureAuth = require('./middleware/ensure-auth');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('config');

require('dotenv').config()

// app.use(cors({
//   'allowedHeaders': ['Content-Type'], // headers that React is sending to the API
//   'exposedHeaders': ['Content-Type'], // headers that you are sending back to React
//   'origin': '*',
//   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   'preflightContinue': false
// }));

// const corsOptions ={
//   origin:'http://localhost:3000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

app.use(cors())

// app.use(
//   require('cors')({
//     origin: 'https://xenodochial-fermi-658615.netlify.app/',
//     credentials: true,
    
//   })
// );
app.UseCors("AllowAllHeaders");
app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:8020', 'http://localhost:3000', 'http://127.0.0.1:9000', 'https://xenodochial-fermi-658615.netlify.app'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});






app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging
app.use(cookieParser());
app.use(bodyParser.json());

const imageUrl = require('../lib/utils/clarifai');

app.use('/api', ensureAuth);


app.post('/imageurl', (req, res) => {
  imageUrl.handleAPICall(req, res);
});

app.post('/api/imageurl', (req, res) => {
  imageUrl.handleAPICall(req, res);
});

app.use('/auth',  require('./controllers/auth')); //(signup/login)
app.use('/api/users',  require('./controllers/users'));
app.use('/api/favorites',  require('./controllers/favorites'));
app.use('/api/cloudinary/',  require('./controllers/cloudinary'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
