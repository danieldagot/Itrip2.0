require('dotenv').config()

const express = require('express')
const app = express()
//const port = process.env.PORT
const path = require('path')
let port = process.env.PORT||8080

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const router = require('./back-end/routes/api')

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()  
})

app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))


app.use(express.static(path.join(__dirname, 'public/main-layout')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'back-end')))
app.use(express.static(path.join(__dirname, 'back-end/mongoose/models')))
app.use(express.static(path.join(__dirname, 'back-end/routes')))

mongoose.connect('mongodb://localhost/Itrip', {
    useNewUrlParser: true
}).then(() => {
    mongoose.set('useFindAndModify', false);

    app.use('/', router)

    


    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
    
    mongoose.connect(process.env.MONGO_URI||"mongodb://localhost/Itrip", { useNewUrlParser: true }).then(() => {
        app.listen(port, function (err, res) {
            console.log("the server runs on port " + port)
        })
    })

})