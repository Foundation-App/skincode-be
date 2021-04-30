const authUser = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class authUserService {
  static async create({ name, email, password }) {
    var saltRounds = 10;

    const passwordHashVar = await bcrypt.hash(password, saltRounds);
    const user = await authUser.insert({
      name,
      email,
      passwordHash: passwordHashVar,
    });

    return user;
  }

  static async authorize({ email, password }) {
    try {
      const user = await authUser.findByEmail(email);
      const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
      if (!passwordsMatch) throw new Error('Invalid Password');

      return user;
    } catch (err) {
      err.status = 401;
      throw err;
    }
  }

  static authToken(user) {
    return jwt.sign(
      {
        user: user.toJSON(),
        // , id: user.id
      },
      process.env.APP_SECRET,
      {
        expiresIn: '24h',
      }
    );
  }

  static verifyAuthToken(token) {
    const user = jwt.verify(token, process.env.APP_SECRET);
    return user;
  }
};
