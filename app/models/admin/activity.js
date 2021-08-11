const errorCatch = require('../../services/error');
const db = require('../../database');


//Constructeur qui cree un modele Activity 
class Activity {
    constructor(data={}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    //Fonction asynchrone qui renvoie toutes les activites de la BDD 
    static async findAll() {
        try {
            const preparedQuery = {
                text: `SELECT * FROM "activity"`,
            };
            const {rows} = await db.query(preparedQuery);
            return rows;

        } catch (error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui renvoie une activite de la BDD 
    static async findOne(activityId) {
        try {
            const preparedQuery = {
                text: `SELECT * FROM "activity" WHERE id = $1 `,
                values: [activityId],
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


    //Fonction asynchrone qui modifie une activite  (son nom, photo, adresse, coordonees pour maps, id)
    static async update(activity) {
        try {
            const preparedQuery = {
                text: `UPDATE "activity"
                        SET name = $1,
                            photo_url = $2,
                            formatted_address = $3,
                            lat = $4,
                            lng = $5
                        WHERE id = $6`,
                values: [activity.name, activity.photoUrl, activity.formattedAddress, activity.lat, activity.lng, activity.id],
            }
            await db.query(preparedQuery);
            return true;
        } catch (error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui supprime une activite dans la BDD
    static async delete(activityId) {
        try {
            const preparedQuery = {
                text: `DELETE FROM "activity" WHERE id = $1`,
                values: [activityId],
            }
            await db.query(preparedQuery);
            return true;
        } catch (error) {
            errorCatch(error);
        }
    }
}

module.exports = Activity;