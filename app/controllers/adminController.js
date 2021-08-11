const User = require('../models/admin/user');
const Activity = require('../models/admin/activity');
const WishList = require('../models/admin/wishlist');
const Calendar = require('../models/admin/calendar');

//Un controlleur qui contient toutes les fonctionnalites concernant la page Admin
const adminController = {

    // ================== Admin ==================

    getCountInstanceAllTable: async (req, res) => {
        try {
            const users = await User.findAll();
            const activities = await Activity.findAll();
            const wishlists = await WishList.findAll();
            const calendars = await Calendar.findAll();

            res.json({
                users: users.length,
                activities: activities.length,
                wishlists: wishlists.length,
                calendars: calendars.length,
            })
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },


    // ================== User ==================

    //Fonction asynchrone qui renvoie tous les users via le modele User
    findAllUser: async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users); 
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    //Fonction qui renvoie le User fourni par req.body.id
    findOneUser: async (req, res) => {
        try {
            const user = await User.findOne(req.body.id);
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },


    //Fonction qui permet de modifier et renvoyer les Users
    updateUser: async (req, res) => {
        try {
            await User.update(req.body);
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    //Fonction qui permet de supprimer et renvoyer les Users
    deleteUser: async (req, res) => {
        try {
            console.log(req.params.id);
            const user = await User.delete(req.params.id);
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    // ================== Activity ==================

    //Fonction asynchrone qui renvoie tous les activites via le modele Activity
    findAllActivity: async (req, res) => {
        try {
            const activities = await Activity.findAll();
            res.json(activities); 
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    //Fonction asynchrone qui renvoie une activite via le modele Activity
    findOneActivity: async (req, res) => {
        try {
            const activity = await Activity.findOne(req.body.id);
            res.json(activity);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    //Fonction qui permet de modifier et renvoyer les activites
    updateActivity: async (req, res) => {
        try {
            await Activity.update(req.body);
            const activities = await Activity.findAll();
            res.json(activities);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    //Fonction qui permet de supprimer et renvoyer les activites
    deleteActivity: async (req, res) => {
        try {
             await Activity.delete(req.params.id);
             const activities = await Activity.findAll();
            res.json(activities);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

     // ================== WishList ==================

    //Fonction asynchrone qui renvoie tous les wishlists via le modele Wishlist
     findAllWishList: async (req, res) => {
        try {
            const wishlists = await WishList.findAll();
            res.json(wishlists); 
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    //Fonction qui permet de supprimer et renvoyer les wishlists
    deleteOneActivityTotheWishList: async (req, res) => {
        try {
            await WishList.delete(req.params.id);
            const wishlists = await WishList.findAll();
            res.json(wishlists);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

     // ================== Calendar ==================
     
    //Fonction asynchrone qui renvoie tous les calendars via le modele Calendar
     findAllCalendars: async (req, res) => {
        try {
            const calendars = await Calendar.findAll();
            res.json(calendars); 
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    //Fonction asynchrone qui renvoie tous les calendars via le modele Calendar
    findOneCalendar: async (req, res) => {
        try {
            const calendar = await Calendar.findOne(req.body.id);
            res.json(calendar);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    //Fonction qui permet de modifier et renvoyer les calendars
    updateCalendar: async (req, res) => {
        try {
            await Calendar.update(req.body);
            const calendars = await Calendar.findAll();
            res.json(calendars);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    //Fonction qui permet de supprimer et renvoyer les calendars
    deleteCalendar: async (req, res) => {
        try {
            await Calendar.delete(req.params.id);
            const calendars = await Calendar.findAll();
            res.json(calendars);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

}

module.exports = adminController;