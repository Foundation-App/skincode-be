const express = require('express');
const app = express();
const ensureAuth = require('./middleware/ensure-auth');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// app.use(
//   require('cors')({
//     origin: 'https://xenodochial-fermi-658615.netlify.app/',
//     credentials: true,
    
//   })
// );



app.use(allowCrossDomain);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

const imageUrl = require('../lib/utils/clarifai');

app.use('/api', ensureAuth);

app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:8020', 'http://localhost:8020', 'http://127.0.0.1:9000', 'https://xenodochial-fermi-658615.netlify.app/'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

// app.get('/', (req, res) => {
//   res.json('you are at 7893');
// });

// app.get('/test', (req, res) => {
//   res.json('success');
// });
app.post('/imageurl', (req, res) => {
  imageUrl.handleAPICall(req, res);
});

app.post('/api/imageurl', (req, res) => {
  imageUrl.handleAPICall(req, res);
});

app.use('/auth', cors(), require('./controllers/auth')); //(signup/login)
app.use('/api/users', cors(), require('./controllers/users'));
app.use('/api/favorites', cors(), require('./controllers/favorites'));
app.use('/api/cloudinary/', cors(), require('./controllers/cloudinary'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
