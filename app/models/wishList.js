const errorCatch = require('../services/error');
const db = require('../database');

//Constructeur qui cree un modele WishList
class WishList {
    constructor(data={}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    //Fonction asynchrone qui renvoie la wishlist de l'utilisateur 
    static async findWishListByUserId(userId) {
        try {
            const preparedQuery = {
                text: `SELECT name, photo_url, lat, lng, activity_id FROM activity INNER JOIN user_has_activity ON activity.id = user_has_activity.activity_id WHERE user_id = $1;`,
                values: [userId]
            }
            const {rows} = await db.query(preparedQuery);
            return rows;

        } catch (error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui renvoie une activite de l'utilisateur
    static async findOnebyName(name) {
        try {
            const preparedQuery = {
                text: `SELECT id FROM activity WHERE name = $1`,
                values: [name]
            };
            const {rows} = await db.query(preparedQuery);
            if (rows[0]) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui cree une activite 
    static async createActivity(activity) {
        try {
            const preparedQuery = {
                text: `INSERT INTO "activity" ("name", "photo_url", "formatted_address", "lat", "lng") VALUES ($1, $2, $3, $4, $5) RETURNING id;`,
                values: [activity.name, activity.photoUrl, activity.formattedAddress, activity.lat, activity.lng]
            };
            const {rows} = await db.query(preparedQuery);
            if (rows[0]) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            errorCatch(error);
        }
    }


    //Fonction asynchrone qui ajoute une activite dans la wishlist 
    static async addOneActivityToWhishList(userId, activityId) {
        try {
            const preparedQuery = {
                text: `INSERT INTO "user_has_activity" ("user_id", "activity_id") VALUES ($1, $2) RETURNING id;`,
                values: [userId, activityId]
            };
            
            const {rows} = await db.query(preparedQuery);
            console.log('rows -> ', rows);
            if (rows[0]) {
                return rows[0];
            } else {
                return null;
            }
        } catch(error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui verifie que l'activite n'est pas deja dans la wishlist de l'utilisateur
    static async duplicateCheck(userId, activityId) {
        try {
            const preparedQuery = {
                text: `SELECT id FROM "user_has_activity" WHERE user_id=$1 AND activity_id=$2;`,
                values: [userId, activityId]
            };
            
            const {rows} = await db.query(preparedQuery);
            if (rows[0]) {
                return rows[0];
            } else {
                return null;
            }
        } catch(error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui supprime l'activite de la wishlist
    static async deleteOneActivityToWhishList(userId, activityId) {
        try {
            const preparedQuery = {
                text: `DELETE FROM "user_has_activity" WHERE user_id = $1 AND activity_id = $2`,
                values: [userId, activityId]
            };
            await db.query(preparedQuery);
            
        } catch(error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui supprime toutes les activites de la wishlist
    static async deleteAllActivitiesToWishList(userId) {
        try {
            const preparedQuery = {
                text: `DELETE FROM "user_has_activity" WHERE user_id = $1`,
                values: [userId]
            };
            await db.query(preparedQuery);
            
        } catch(error) {
            errorCatch(error);
        }
    }
}

module.exports = WishList;