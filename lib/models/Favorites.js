const pool = require('../utils/pool');

module.exports = class Favorites {
    id;
    username;
    user_id;
    makeup_name;
 

    constructor(row) {
        this.id = row.id;
        this.username = row.username;
        this.user_id = row.user_id;
        this.makeup_name = row.makeup_name;
    }

    static async insert({ makeup_name, username }) {
        const { rows } = await pool.query(
            'INSERT INTO favorites (makeup_name, username) VALUES ($1, $2) RETURNING *', 
            [ makeup_name, username ]
        );

        return new Favorites(rows[0]);
    }

    //insert users email 
    static async find(username) {
        const { rows } = await pool.query(
            'SELECT * FROM favorites WHERE username=$1', 
            [ username ]
        );

        return new Favorites(rows[0]);
    }
    



}