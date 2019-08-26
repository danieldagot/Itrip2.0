
const request = require('request')
var rp = require('request-promise');

async function GooglePlaces(state, callback) {
   return await rp.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${state.latLng.lat},${state.latLng.lng}&radius=1500000&type=${state.type}&fields=name,rating&key=AIzaSyCHJL5eNLo3w6kFDG6WWRPZqMCQzEzQDmE&language=en   `

   ).then(function(htmlString){
       let a = JSON.parse(htmlString)
       //console.log(a);
       
      return a
   })
   

}

module.exports = GooglePlaces


//request.get( `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${state.latLng.lat},${state.latLng.lng}&radius=1500&type=${state.type}&key=${process.env.REACT_APP_GOOGLE_KEY}`, function ( error, response, body ) {

