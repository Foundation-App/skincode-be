const authUserService = require('../services/authUserService');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.session;
    req.user = authUserService.verifyAuthToken(token);
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
