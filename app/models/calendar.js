const errorCatch = require('../services/error');
const db = require('../database');

//Constructeur qui cree un modele Calendar
class Calendar {
    constructor(data={}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    //Fonction asynchrone qui renvoie le calendrier de l'utilisateur de la BDD 
    static async findCalendarByUserId(userId) {
        try {
            const preparedQuery = {
                text: `SELECT id, title, start_date, end_date, lat, lng FROM activity_used WHERE user_id = $1;`,
                values: [userId]
            }
            const {rows} = await db.query(preparedQuery);
            return rows;

        } catch (error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui insere une activite dans l'agenda de l'utilisateur
    static async createActivityUsed(activityUsed, userId) {
        try {
            const preparedQuery = {
                text: `INSERT INTO "activity_used" ("title", "start_date", "end_date", "lat", "lng", "user_id") VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`,
                values: [activityUsed.title, activityUsed.start_date, activityUsed.end_date, activityUsed.lat, activityUsed.lng, userId]
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

    //Fonction asynchrone qui supprime toutes les activites du calendrier
    static async deleteOneActivityInCalendar(activityUsedId) {
        try {
            const preparedQuery = {
                text: `DELETE FROM "activity_used" WHERE id = $1`,
                values: [activityUsedId]
            };
            await db.query(preparedQuery);
            
        } catch(error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui supprime toutes les activites du calendrier
    static async deleteAllActivitiesInCalendar(userId) {
        try {
            const preparedQuery = {
                text: `DELETE FROM "activity_used" WHERE user_id = $1`,
                values: [userId]
            };
            await db.query(preparedQuery);
            
        } catch(error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui modifie toutes les activites du calendrier
    static async modifyOneActivityInCalendar(id, startDate, endDate) {
        try {
            const preparedQuery = {
                text: `UPDATE activity_used SET start_date = $1, end_date = $2 WHERE id = $3`,
                values: [startDate, endDate, id]
            };
            await db.query(preparedQuery);
            
        } catch(error) {
            errorCatch(error);
        }
    }
}

module.exports = Calendar;