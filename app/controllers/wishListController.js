const WishList = require('../models/wishList');

//Un controlleur qui contient toutes les fonctionnalites concernant la wishlist de l'utilisateur
const wishListController = {

    //Fonction asynchrone qui renvoie la wishlist d'un utilisateur
    findWishListByUserId: async (req, res) => {
        try {
            console.log(req.user.userId);
            const wishList = await WishList.findWishListByUserId(req.user.userId);
            //Remplacer params par req.userId compris dans le middleware d'authentification
            res.json(wishList);
        } catch (error) {
            console.log(error)
            res.status(500);
        }
    },

    //FOnction asynchrone qui ajoute une activite dans la wishlist de l'utilisateur
    addOneActivityToWhishList: async (req, res) => {
        try {
            let activity = await WishList.findOnebyName(req.body.name);
            //Ne pas oublier de renvoyer null si elle existe pas en base
            if (!activity){
                //Si elle n'existe pas deja en base je la crée
                activity = await WishList.createActivity(req.body);
            }
            //Avant de l'ajouter je verifie qu'il ne la pas déja héhé vous l'avez pas vu venir celle la :) 
            const duplicateCheck = await WishList.duplicateCheck(req.user.userId, activity.id);

            //Ensuite je l'ajoute dans la wishList de l'user si elle n'existe pas
            if (!duplicateCheck) {
                await WishList.addOneActivityToWhishList(req.user.userId, activity.id);
            }
            //Et je retourne ça wishList
            const wishList = await WishList.findWishListByUserId(req.user.userId);
            res.json(wishList);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    //Fonction asynchrone qui supprime l'activite de la wishlist de l'utilisateur 
    deleteOneActivityToWhishList: async (req, res) => {
        try {
            await WishList.deleteOneActivityToWhishList(req.user.userId, req.body.activityId);

            //Et je retourne sa wishList
            const wishList = await WishList.findWishListByUserId(req.user.userId);
            res.json(wishList);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    },

    //Fonction asynchrone qui supprime toutes les activitees de la wishlist de l'utilisateur 
    deleteAllActivitiesToWishList: async (req, res) => {
        try {
            await WishList.deleteAllActivitiesToWishList(req.user.userId);
            const wishList = await WishList.findWishListByUserId(req.user.userId);
            res.json(wishList);
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    }
};

module.exports = wishListController;