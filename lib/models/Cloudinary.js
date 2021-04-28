const pool = require('../utils/pool');

module.exports = class Cloudinary {
    id;
    username;
    imageurl;
    date;
 

    constructor(row) {
        this.id = row.id;
        this.username = row.username;
        this.imageurl = row.imageurl;
        this.date = row.date;
    }

    static async insert({ username, imageurl, date }) {
        const { rows } = await pool.query(
            'INSERT INTO cloudinary (username, imageurl, date) VALUES ($1, $2, $3) RETURNING *', 
            [ username, imageurl, date ]
        );

        return new Cloudinary(rows[0]);
    }

    //FIND ALL
    static async find(username) {
        const { rows } = await pool.query(
            'SELECT * FROM cloudinary WHERE username=$1', 
            [ username ]
        );

        return new Cloudinary(rows[0]);
    }

    //FIND BY ID
     static async findById(username) {
        const { rows } = await pool.query(
            'SELECT * FROM cloudinary WHERE username=$1', 
            [ username ]
        );

        return rows.map((row) => new Cloudinary(row));
    }


}