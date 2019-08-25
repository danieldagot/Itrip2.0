
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  "UserName": String,
  "Age": Number,
  "Gender": String,
  "Country": String,
  "Trips": [],
  "Xp": { type: Number, default: 0 },
  "Tripnum": { type: Number, default: 0 },
  "Interest" : [String],
 "Trip" : {}
})




const user = mongoose.model('user', userSchema)
//  data.map( m => {
//      let c  = new client(m)
//         console.log(c);
//         c.save()
//     })

module.exports = user