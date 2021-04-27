const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const User = require('../models/User');

module.exports = Router()

.get('/', ensureAuth, async (req, res, next) => {
        try {
          const user = await User.find();
          res.send(user);
        } catch (err) {
          next(err);
        }
})