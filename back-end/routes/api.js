
//import GooglePlaces from "../placesApi" 

const GooglePlaces = require("../placesApi")
const express = require('express')
const router = express.Router()
const user = require("../mongoose/models/user")
//const moment = require("moment")
const request = require("request")
const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

// const placesApi = require('./placesApi')
const wikiApi = require('./wikiApi')




let Interest = {
    Night: ["bar", "night_club", "casino"],
    Extreme: ["amusement_park"],
    Food: ["cafe", "restaurant"],
    Nature: ["park", "aquarium", "zoo"],
    Beauty: ["beauty_salon", "spa", "jewelry_store"],
    Art: ["museum", "movie_theater"]
}


function wikiInfo() {
    request.get("http://en.wikipedia.org/w/api.php?action=opensearch&search=japan&format=json&callback=wikiCallback", function (error, response, body) {
        const info = body

    })
}

module.exports = wikiInfo

router.post('/addUser', (req, res) => {
    let data = req.body

    let t = new user(data)
    // console.log(t);
    t.save()
    res.send(t)
})

router.put('/GooglePlaces', async (req, res) => {

    let state = req.body
    let interest = []
    for (const key in state.type) {
        if (state.type[key] ) {
            interest.push(key)
        }
    }
    let a = []
    interest.forEach(i => {
        Interest[i].forEach(j => a.push(j))

    })
    state.type = a

    
    let data = await GooglePlaces(state)

    let f = data.results.map(m => { return { name: m.name, value: m.rating ,geometry : m.geometry } })
    f = f.filter(f => f.value)

    //f.splice(0,1)
    // sort by value
    f.sort(function (a, b) {
        return b.value - a.value;
    });

    res.send(f.slice(0, 10))


})

router.get('/user/:userName', (req, res) => {

    const UserName = req.params.userName
    user.findOne({ UserName: UserName }).exec(function (err, set) {

        res.send(set)
    })
})

router.put('/addIntrest/:userName', (req, res) => {
    const userName = req.params.userName
    let data = req.body

    user.findOneAndUpdate({ UserName: userName }, data, { upsert: true }, function (err, doc) {
        //console.log(doc);
        return (doc);
    }).then(function (data) {
        res.send(data)
    })

})


router.put('/addTrip/:username', (req, res) => {
    const userName = req.params.userName
    let data = req.body
 
   
    user.findOneAndUpdate({ _id: data._id }, data, { upsert: true }, function (err, doc) {
        return (doc);
    }).then(function (data) {
        res.send(data)
    })
})

router.get('/getRecomandet/:userName', (req, res) => {

    const userName = req.params.userName
    user.findOne({ UserName: userName }).exec(function (err, set) {
        res.send(set)

    })
})


router.get('/wikipedia/:place', async (req, res) => {
    let place = req.params.place
    let a = await wikiApi(place)
    res.send(a)
})




router.get('/getTrips/:userName', (req, res) => {
    const userName = req.params.userName
    user.findOne({ UserName: userName }).populate({
        path: 'Trips',
        populate: {
            path: 'places'
        }
    })
        .exec(function (err, Trips) {
            res.send(Trips)
        })

})





module.exports = router



// https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=3&size=600x300&maptype=roadmap
// &markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318
// &markers=color:red%7Clabel:C%7C40.718217,-73.998284
// &key=AIzaSyCHJL5eNLo3w6kFDG6WWRPZqMCQzEzQDmE


//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.062,34.7735&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyCHJL5eNLo3w6kFDG6WWRPZqMCQzEzQDmE

/**
 *
 *
 *
 * const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema

const userSchema = new Schema( {
    name : String,
    age: Number,
    activity : Number,
    height : Number,
    weight : Number,
    sex : Number,
    bmi : Number,
    bmr : Number,
    cal : Number,
    activity : Number,
    condition: String ,
    recomandetCal : Number,
    saveDate : String ,

} )

// const ColorSchema = new Schema( {
//     name: String,
//     hexCode: String,
//     rgb: RGBColor
// } )

 const user = mongoose.model( 'user', userSchema )

module.exports = user

 *
 */


 // router.put('/clients', (req, res) => {
//     let data = req.body
//     let id = data.id
//     user.findOneAndUpdate({
//         _id: id
//     }, data, {
//         upsert: true
//     }, function (err, doc) {
//         return res.send(doc);
//     })
// })

// router.put('/client', (req, res) => {
//     let data = req.body
//     let id = data._id
//     client.findOneAndUpdate({
//         _id: id
//     }, data, {
//         upsert: true
//     }, function (err, doc) {


//         return res.send(doc);
//     })
// })
