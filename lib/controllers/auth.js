const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const authUserService = require('../services/authUserService');

const attachCookie = (res, user) => {
  res.cookie('session', authUserService.authToken(user), {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: process.env.NODE_ENV !== 'test' && 'none',
    // secure: process.env.NODE_ENV !== 'test',
    
  });
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    authUserService
      .create(req.body)
      .then((user) => {
        const cookie = attachCookie(res, user);
        res.send(user);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    authUserService
      .authorize(req.body)
      .then((user) => {
        const cookie = attachCookie(res, user);
        res.send(user);
      })
      .catch(next);
  })

  .post('/logout', (req, res, next) => {
    res.clearCookie('session');
    res.end();
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
    res.json({ verified: true });
  });
