const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const User = require('../models/User');

module.exports = Router()

.get('/users', ensureAuth, (req, res, next) => {
    User
        .findAll()
        .then(booger => res.send(booger))
        .catch(next);
})