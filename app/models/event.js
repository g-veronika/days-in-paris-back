const errorCatch = require('../services/error');
const fetch = require('node-fetch');
const db = require('../database');

//Constructeur qui cree un modele Event
class Event {
    constructor(data={}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    //Fonction asynchrone qui renvoie toutes les activites 
    static async findAll(){
        try {

            //On fait une requete API grace a fetch
            //On utilise API Google Places pour avoir une liste des points d'interet les plus importants
            let events_info = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=paris+city+point+of+interest&language=fr&key=AIzaSyBtNnMdadxuQ_-r2rv6iBPjDrTacKbabcI').then(value => value.json());

                
                let typesArray = [];
                let result = [];
                
                events_info.results.forEach(element => {
                    typesArray.push(element.types);
                    typesArray.forEach(el => {                  
                        el.forEach(data => {
                            result.push(data)
                        }) 
                    })
                });
                let uniqueTypes = [...new Set(result)]    
                return {events_info, uniqueTypes}
                   
        } catch (error) {
            errorCatch(error)
        }
    }

    //Fonction asynchrone qui renvoie la page uivante des points d'interet
    static async findAllNextPage(nextpage){
        try {
            let events_info = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=paris+city+point+of+interest&language=fr&key=AIzaSyBtNnMdadxuQ_-r2rv6iBPjDrTacKbabcI&pagetoken='+ nextpage).then(value => value.json());
                            
            return events_info

        } catch (error) {
            errorCatch(error)
        }
    }

    //Fonction asynchrone qui renvoie toutes les activites filtrees par categories (+ la page suivante)
    static async findWithFilter(cat, nextpage){
        try {
 
            let events_info = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=paris+city+point+of+interest+'+ cat +'&language=fr&key=AIzaSyBtNnMdadxuQ_-r2rv6iBPjDrTacKbabcI&pagetoken='+ nextpage).then(value => value.json());


            return events_info

        }catch (error) {
            errorCatch(error)
        }
    }

    //Fonction asynchrone qui renvoie toutes les activites filtrees par categories et mot cles entres pas l'utilisateur (+ la page suivante)
    static async findByCatAndInput(cat, input, nextpage){
        try {
            let events_info = await fetch('https://maps.googleapis.com/maps/api/place/textsearch/json?query=paris+city+point+of+interest+'+ input + '+'+ cat +'&language=fr&key=AIzaSyBtNnMdadxuQ_-r2rv6iBPjDrTacKbabcI&pagetoken='+ nextpage).then(value => value.json());


            return events_info
        }catch (error) {
            errorCatch(error)
        }
    }

    //Fonction asynchrone qui ajoute la valeur a chaque activite si elle n'est pas definie
    static async addValues(content){
        try {
            content.results.forEach(el => {
                // console.log(el.user_ratings_total)
                if(el.user_ratings_total) {
                    return el
                }
                //Si valeur d'activite est undefined on lui attribue la valeur 0
                else {
                    el.user_ratings_total = 0;
                    el.rating = 0
                    return el
                }
            })
            return content
        }catch (error) {
            errorCatch(error)
        }
    }

    //Fonction asynchrone qui renvoie les photos des activites
    static async findPhotos(events) {
        try {

            //Fonction asynchrone pour renvoyer toutes les references photo depuis params
            const photos = async () => {

                const newTab = await Promise.all(events.map(el => {

                    //On retourne l'URL de la photo
                    if (el.photos){
                        return new Promise(                     
                            (resolve, reject) => {                         
                                resolve(                               
                                    fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${el.photos[0].photo_reference}&language=fr&key=AIzaSyBtNnMdadxuQ_-r2rv6iBPjDrTacKbabcI`)
                                    .then(data => {   
                                        return data.url})
                                )
                            })
                    }
                    else {
                        return "No photo available for this event"
                    }
                }))
                
                return newTab
            }
            return photos()
             
        } catch (error) {
            errorCatch(error)
        }
    } 


    //Fonction asynchrone qui renvoie les activites Live Shows
    static async findLiveShows(event){

        try {
            let events_info = await fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&rows=20&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type&refine.category='+ event + '+').then(value => value.json());
            

            let array = events_info.records.map(el => {
                console.log(el.fields.lat_lon)
                if (el.fields.lat_lon){
                    return {
                        formatted_address: el.fields.address_street + ' ' + el.fields.address_zipcode+ ' ' + el.fields.address_city,
                        adress_name: el.fields.address_name,
                        geometry: {
                            location: {
                                lat: el.fields.lat_lon[0],
                                lng: el.fields.lat_lon[1]
                            }
                        },
                        name: el.fields.title,
                        short_description: el.fields.lead_text
                    }
                }
                else {
                    return {
                        formatted_address: el.fields.address_street + ' ' + el.fields.address_zipcode+ ' ' + el.fields.address_city,
                        adress_name: el.fields.address_name,
                        name: el.fields.title,
                        short_description: el.fields.lead_text  
                }
                
                        
                    
                }
            })
            let photos = events_info.records.map(el => {
                return el.fields.cover_url
            })


            console.log(array)             
            return {
                events: {
                    results: array
                }, 
                photos
            }; 
                   
        } catch (error) {
            errorCatch(error)
        }
    }  

    //Fonction asynchrone qui ajoute une categorie dans une activite
    static async addCategory(cat, user) {
        try { 
            const preparedQuery = {
                text: `INSERT INTO "activity"(api_activity_id, used_activity, start_date, end_date, user_info_id) VALUES($1, $2, $3, $4, $5)`,
                values: [cat.id, cat.used, user.id]
            }
            const {rows} = await db.query(preparedQuery)
        } catch (error) {
            errorCatch(error)
        }
    } 
}

module.exports = Event;