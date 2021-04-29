const pool = require('../utils/pool');

module.exports = class User {
  id;
  name;
  email;
  passwordHash;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.email = row.email;
    this.passwordHash = row.password_hash;
  }

  static async insert({ name, email, passwordHash }) {
    const {
      rows,
    } = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [name, email, passwordHash]
    );

    return new User(rows[0]);
  }

  //NEWWWW
  static async find() {
    const { rows } = await pool.query('SELECT * FROM users');

    return rows.map((row) => new User(row));
  }

  static async findByEmail(email) {
    console.log(email, 'EMAIL');
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [
      email,
    ]);

    if (!rows[0]) throw new Error(`There is no customers with email ${email}`);

    return new User(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM customers WHERE id=$1', [
      id,
    ]);

    return rows.map((row) => new User(row));
  }

  toJSON() {
    const json = { ...this };
    delete json.passwordHash;
    return json;
  }
};
