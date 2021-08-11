const errorCatch = require('../../services/error');
const db = require('../../database');

//Constructeur qui cree un modele Wishlist
class WishList {
    constructor(data={}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    //Fonction asynchrone qui renvoie tous les wishlists de la BDD
    static async findAll() {
        try {
            const preparedQuery = {
                text: `SELECT * FROM "user_has_activity"`,
            };
            const {rows} = await db.query(preparedQuery);
            return rows;

        } catch (error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui supprime un wishlist de la BDD
    static async delete(id) {
        try {
            const preparedQuery = {
                text: `DELETE FROM "user_has_activity" WHERE id = $1`,
                values: [id]
            };
            await db.query(preparedQuery);
            return true;
        } catch (error) {
            errorCatch(error);
        }
    }
}

module.exports = WishList;