const Calendar = require('../models/calendar');

//Un controlleur qui contient toutes les fonctionnalites concernant le calendrier de l'utilisateur
const calendarController = {

    //Fonction asynchrone qui renvoie tous les calendriers via le modele Calendar
    //Fourni par req.user.id
    findCalendarByUser: async (req, res) => {
        try {
            const calendar = await Calendar.findCalendarByUserId(req.user.userId);
            //remplacer params par req.userId compris dans le middleware d'authentification
            console.log(calendar);
            res.json(calendar);
        } catch (error) {
            console.log(error)
            res.status(500);
        }
    },

    //Fonction qui ajoute une nouvelle activite (req.body) dans le calendrier de l'utilisateur (req.userId)
    addOneActivityToCalendar: async (req, res) => {
        try {
            let calendar = await Calendar.createActivityUsed(req.body, req.user.userId);
            res.json(calendar);
        } catch (error) {
            console.log('addOneCalendar', error)
            res.status(500);
        }
    },

    //Fonction qui permet de supprimer une activite du calendrier
    deleteOneActivityInCalendar: async (req, res) => {
        try {
            console.log('delete quel id?', req.body.deleted);
            let calendar = await Calendar.deleteOneActivityInCalendar(req.body.deleted);
            res.json(calendar);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    //Fonction qui permet de supprimer toutes les activites du calendrier
    deleteAllActivitiesInCalendar: async (req, res) => {
        try {
            let calendar = await Calendar.deleteAllActivitiesInCalendar(req.user.userId);
            res.json(calendar);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    //Fonction qui modifie une activite du calendrier
    modifyOneActivityInCalendar: async (req, res) => {
        try {

            //On recoit l'ID de l'activite (nombre entier) ainsi que les dates de debut et la fin de l'activite a modifier
            let calendar = await Calendar.modifyOneActivityInCalendar(parseInt(req.body.id, 10), req.body.startDateFormated, req.body.endDateFormated);
            res.json(calendar);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },
};

module.exports = calendarController;