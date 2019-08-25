    
const mongoose = require( 'mongoose' )
const Schema = mongoose.Schema

const tripSchema = new Schema({
    "Number": Number,
    "Country": String,
    "places" : [],
    "interest": Object ,
    "userid": String,
    "date" : Date
})

 const trip = mongoose.model( 'trips', tripSchema )
//  data.map( m => {
//      let c  = new client(m)
//         console.log(c);
//         c.save()
//     })
    
  module.exports = trip 