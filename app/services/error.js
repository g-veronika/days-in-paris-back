module.exports = 

//Fonction qui traite les erreurs 
    function errorTreatment(error){
        if (error.detail) {
                throw new Error(error.detail);
        } else {
            throw error;
        }
    };