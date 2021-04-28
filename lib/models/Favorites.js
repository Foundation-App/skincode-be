const pool = require('../utils/pool');

module.exports = class Favorites {
    id;
    username;
    user_id;
    makeup_name;
    image_link;
    brand;
    color;
    hex;
    product_link;
    date_added;
 

    constructor(row) {
        this.id = row.id;
        this.username = row.username;
        this.makeup_name = row.makeup_name;
        this.image_link = row.image_link;
        this.brand = row.brand;
        this.color = row.color;
        this.hex = row.hex;
        this.product_link = row.product_link;
        this.date_added = row.date_added;
    }

    static async insert({ username, makeup_name, image_link, brand, color, hex, product_link, date_added}) {
        const { rows } = await pool.query(
            'INSERT INTO favorites (username, makeup_name, image_link, brand, color, hex, product_link, date_added) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', 
            [ username, makeup_name,  image_link, brand, color, hex, product_link, date_added ]
        );

        return new Favorites(rows[0]);
    }

    //FIND ALL
    static async find(username) {
        const { rows } = await pool.query(
            'SELECT * FROM favorites WHERE username=$1', 
            [ username ]
        );

        return new Favorites(rows[0]);
    }

    //FIND BY ID
     static async findById(username) {
        const { rows } = await pool.query(
            'SELECT * FROM favorites WHERE username=$1', 
            [ username ]
        );

        return rows.map((row) => new Favorites(row));
    }


}