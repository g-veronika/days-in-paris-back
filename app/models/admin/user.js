const errorCatch = require('../../services/error');
const db = require('../../database');

//Constructeur qui cree un modele User
class User {
    constructor(data={}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    //Fonction asynchrone qui renvoie tous les utilisateurs de la BDD
    static async findAll() {
        try {
            const preparedQuery = {
                text: `SELECT * FROM "user"`,
            };
            const {rows} = await db.query(preparedQuery);
            return rows;

        } catch (error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui renvoie un utilisateur de la BDD
    static async findOne(userId) {
        try {
            const preparedQuery = {
                text: `SELECT * FROM "user" WHERE id = $1 `,
                values: [userId],
            }
            const {rows} = await db.query(preparedQuery);
            if (rows[0]){
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui modifie un utilisateur de la BDD
    static async update(user) {
        try {
            const preparedQuery = {
                text: `UPDATE "user"
                        SET first_name = $1,
                            last_name = $2,
                            email = $3,
                            img_url = $4,
                            is_admin = $5
                        WHERE id = $6`,
                values: [user.firstName, user.lastName, user.email, user.imgUrl, user.isAdmin, user.id],
            }
            await db.query(preparedQuery);
            return true;
        } catch (error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui supprime un utilisateur de la BDD
    static async delete(userId) {
        try {
            const preparedQuery = {
                text: `DELETE FROM "user" WHERE id = $1`,
                values: [userId],
            }
            await db.query(preparedQuery);
            return true;
        } catch (error) {
            errorCatch(error);
        }
    }
}

module.exports = User;