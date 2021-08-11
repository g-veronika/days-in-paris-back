const User = require('../models/user');

//Un controlleur qui contient toutes les fonctionnalites concernant les utilisateurs
const userController = {

    //Fonction qui renvoie un utilisateur (req.user.userId) de la BDD
    findOne: async (req, res) => {
        try {
            // console.log('>> GET /profile', req.user);
            const user = await User.findOne(req.user.userId);

            //On reformate le resultat de la requete
            res.json({
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                imgUrl: user.img_url,
                createdAt: user.created_at,
            });
        } catch (error) {
            console.log(error)
            res.status(500);
        }
    },

    //Fonction qui modifie l'information (req.body.info, req.body.infoValue) de l'utilisateur (req.user.userId)
    modifyOneInfoInProfile: async (req, res) => {
        try {
            const user = await User.modifyOneInfoInProfile(req.user.userId, req.body.info, req.body.infoValue);
            res.json(user);
        } catch (error) {
            console.log(error)
            res.status(500);
        }
    },

    //Fonction qui modifie l'image de l'utilisateur
    modifyImgInProfile: async (req, res) => {
        try {
            const user = await User.modifyImgInProfile(req.user.userId, req.body.imgUrl);
            res.json(user);
        } catch (error) {
            console.log(error)
            res.status(500);
        }
    }, 

    //Fonction qui supprime l'utilisateur de la BDD
    deleteOne: async (req, res) => {
        try {
            const user = await User.deleteOne(req.user.userId);
            res.json(user);
        } catch (error) {
            console.log(error)
            res.status(500);
        }
    }

}

module.exports = userController;