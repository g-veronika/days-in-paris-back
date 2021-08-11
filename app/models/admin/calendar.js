const errorCatch = require('../../services/error');
const db = require('../../database');


//Constructeur qui cree un modele Calendar
class Calendar {
    constructor(data={}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    //Fonction asynchrone qui renvoie tous les calendriers de la BDD 
    static async findAll() {
        try {
            const preparedQuery = {
                text: `SELECT * FROM "activity_used"`,
            };
            const {rows} = await db.query(preparedQuery);
            return rows;

        } catch (error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui renvoie un calendrier de la BDD 
    static async findOne(calendarId) {
        try {
            const preparedQuery = {
                text: `SELECT * FROM "activity_used" WHERE id = $1 `,
                values: [calendarId],
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

    //Fonction asynchrone qui modifie un calendrier dans la BDD 
    static async update(calendar) {
        try {
            const preparedQuery = {
                text: `UPDATE "activity_used"
                        SET title = $1,
                            start_date = $2,
                            end_date = $3,
                            lng = $4,
                            lat = $5
                        WHERE id = $6`,
                values: [calendar.title, calendar.startDate, calendar.endDate, calendar.lng, calendar.lat, calendar.id],
            }
            await db.query(preparedQuery);
            return true;
        } catch (error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui supprime un calendrier dans la BDD 
    static async delete(calendarId) {
        try {
            const preparedQuery = {
                text: `DELETE FROM "activity_used" WHERE id = $1`,
                values: [calendarId],
            }
            await db.query(preparedQuery);
            return true;
        } catch (error) {
            errorCatch(error);
        }
    }
}

module.exports = Calendar;