    
const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema

const placeSchema = new Schema({
    "lat": Number,
    "lng": Number,
    "userid": String,
    "name": String
})

 const place = mongoose.model( 'place', placeSchema )
//  data.map( m => {
//      let c  = new client(m)
//         console.log(c);
//         c.save()
//     })
    
  module.exports = place 