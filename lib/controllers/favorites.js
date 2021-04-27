const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Favorites = require('../models/Favorites');


module.exports = Router()

// .post('/', ensureAuth, async (req, res, next) => {
//         try {
//           const user = await Favorites.insert(req.body);
//           res.send(user);
//         } catch (err) {
//           next(err);
//         }
// })

.post('/', ensureAuth, async (req, res, next) => {
    Favorites.insert({
        ...req.body})

    .then((booger) => res.send(booger))
    .catch(next);    
})


.get('/', ensureAuth, async (req, res, next) => {
    try {
      const user = await Favorites.find(req.body);
      res.send(user);
    } catch (err) {
      next(err);
    }
})

