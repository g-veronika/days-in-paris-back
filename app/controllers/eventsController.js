const Event = require('../models/event')

//Un controlleur qui contient toutes les fonctionnalites concernant la page d'activites
const eventController = {

    //================ API Google Places ==================

    //Fonction asynchrone qui renvoie toutes les activites avec leurs types ainsi que leurs photos via le modele Event
    findAllEvents: async (req,res,next) => {
        try {

            let eventsContent = await Event.findAll()
            let events = eventsContent.events_info
            let types = eventsContent.uniqueTypes

            //Remplace la valeur 'undefined' que peut nous renvoyer l'API Google Places par 0  
            events = await Event.addValues(events)
            const photos = await Event.findPhotos(events.results)
            res.json({events, photos, types})   
            
        } catch (error) {
            res.status(500).send(error.message)
        }
    },

    //Fonction asynchrone qui renvoie la page suivante des activites non filtrees
    findAllEventsNextPage: async (req,res,next) => {
        try {
            let events = await Event.findAllNextPage(req.body.nextPage)
            events = await Event.addValues(events)
            const photos = await Event.findPhotos(events.results) 
            res.json({events, photos})   
            
        } catch (error) {
            res.status(500).send(error.message)
        }
    },

    //Fonction asynchrone qui renvoie les activites filtrees par categories
    findEventsByCategories: async (req,res,next) => {
        try {
 
            let events = await Event.findWithFilter(req.body.category, req.body.nextPage)
            events = await Event.addValues(events)
            const photos = await Event.findPhotos(events.results)

            res.json({events, photos})   
            
        } catch (error) {
            res.status(500).send(error.message)
        }
    },

    //Fonction asynchrone qui renvoie les activites filtrees par les mots cles rentres par l'utilisateur
    findEventsByUserInput: async (req,res,next) => {
        try {
 
            let events = await Event.findWithFilter(req.body.inputValue, req.body.nextPage)
            events = await Event.addValues(events)
            const photos = await Event.findPhotos(events.results)

            res.json({events, photos})   
            
        } catch (error) {
            res.status(500).send(error.message)
        }
    },

    //Fonction asynchrone qui renvoie les activites filtrees par categories et les mots cles rentres par l'utilisateur
    findEventsByCatAndInput: async (req,res,next) => {
        try {
 
            let events = await Event.findByCatAndInput(req.body.inputValue, req.body.category, req.body.nextPage)
            events = await Event.addValues(events)
            const photos = await Event.findPhotos(events.results)
 
            res.json({events, photos})   
            
        } catch (error) {
            res.status(500).send(error.message)
        }
    },

    //=============== API Que faire a Paris ==========================

    //Fonction asynchrone qui renvoie les activites filtrees par categories (spectacles, concerts, expositions)
    findLiveShows: async (req,res,next) => {
        try {
            console.log('param:',req.params);
            const shows = await Event.findLiveShows(req.params.event)  
            res.json(shows);   
            
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
 }

 module.exports = eventController
