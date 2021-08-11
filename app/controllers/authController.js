const Auth = require('../models/auth');
const jsonwebtoken = require('jsonwebtoken');

//Un controlleur qui contient toutes les fonctionnalites concernant la page d'identification
const authController = {

    //Une fonction qui permet de creer un nouveau compte
    //Avec la verification JWT
    signup: async (req, res, next) => {
        try {
            console.log(req.body)
            console.log("- Auth Controller -")
            const newUser = await Auth.signup(req.body)
            if (newUser) {
                const jwtContent = { userId: newUser.id };
                const jwtOptions = { 
                    algorithm: 'HS256', 
                    expiresIn: '3h' 
                };
                console.log('<< 200 user successfully created');
                res.json({
                    token: jsonwebtoken.sign(jwtContent, process.env.JWT_SECRET_KEY, jwtOptions),
                });
            } else {
                // Si les erreurs de validates pouvait finir ici, ce serait parfait ?!
                res.status(401).send({error: 'une erreur est survenue veuillez reessayer ulterieurement.'});
            }
            

        } catch (error) {
            console.log(error)
            console.log("ici")
            res.status(500).send(error.message);
        }
    },

    //Fonction qui permet a utilisateur de se connecter 
    //Avec la verification JWT
    login: async (req, res) => {
        try {
            const user = await Auth.login(req.body)
            if (user) {
                const jwtContent = { userId: user.id };
                const jwtOptions = { 
                    algorithm: 'HS256', 
                    expiresIn: '3h' 
                };
                console.log('<< 200', user.is_admin);
                res.json({
                    firstName: user.first_name,
                    isAdmin: user.is_admin,
                    token: jsonwebtoken.sign(jwtContent, process.env.JWT_SECRET_KEY, jwtOptions),
                });
            } else {
                console.log('<<< 401');
                res.status(401).send({error: 'L\'email ou le mot de passe ne correspondent pas.'});
            }
            
        } catch (error) {
            res.status(500).send('error');
        }
    }
}

module.exports = authController;