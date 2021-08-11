const errorCatch = require('../services/error');
const db = require('../database');

//Constructeur qui cree un modele User
class User {
    constructor(data={}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    //Fonction asynchrone qui renvoie un utilisateur grace a son ID
    static async findOne(id) {
        try { 
            const preparedQuery = {
                text: `SELECT * FROM "user" WHERE id=$1`,
                values: [id]
            }    
            const {rows} = await db.query(preparedQuery)
            if (rows[0]){
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            errorCatch(error);
        }
    }
    
    //Fonction asynchrone qui modifie l'information de l'utilisateur
    static async modifyOneInfoInProfile(id, info, infoValue) {
        try { 
            if ( info === 'lastName') {
            const preparedQuery = {
                text: `UPDATE "user" SET last_name = $1 WHERE id = $2`,
                values: [infoValue, id]
            }    
            await db.query(preparedQuery);   
            } 
            if ( info === 'firstName') {
                const preparedQuery = {
                    text: `UPDATE "user" SET first_name = $1 WHERE id = $2`,
                    values: [infoValue, id]
                }    
                await db.query(preparedQuery);   
            } 
            if ( info === 'email') {
                const preparedQuery = {
                    text: `UPDATE "user" SET email = $1 WHERE id = $2`,
                    values: [infoValue, id]
                }    
                await db.query(preparedQuery);   
            } 
                
        } catch (error) {
            errorCatch(error);
        }
    }
    
    //Fonction asynchrone qui modifie l'image du profil de l'utilisateur
    static async modifyImgInProfile(id, imgUrl) {

        try { 
            const preparedQuery = {
                text: `UPDATE "user" SET img_url = $1 WHERE id = $2`,
                values: [imgUrl, id]
            }    
            await db.query(preparedQuery);                   
        } catch (error) {
            errorCatch(error);
        }
    }

    //Fonction asynchrone qui supprime l'utilisateur de la BDD grace a son ID
    static async deleteOne(id) {

        try { 
            const preparedQuery = {
                text: `DELETE FROM "user" WHERE id = $1`,
                values: [id]
            }    
            await db.query(preparedQuery);                   
        } catch (error) {
            errorCatch(error);
        }
    }
}

module.exports = User;