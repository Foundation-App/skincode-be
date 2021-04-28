const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Cloudinary = require('../models/Cloudinary');

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
    Cloudinary.insert({
      ...req.body,
    })

      .then((booger) => res.send(booger))
      .catch(next);
  })

  .get('/', ensureAuth, async (req, res, next) => {
    try {
      const user = await Cloudinary.find(req.body.id);
      res.send(user);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', ensureAuth, async (req, res, next) => {
    try {
      const user = await Cloudinary.findById(req.params.id);
      res.send(user);
    } catch (err) {
      next(err);
    }
  });
