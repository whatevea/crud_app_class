require("dotenv").config()
var cors = require('cors');
const express = require("express")
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const app = express()
//connecting to database
mongoose.connect('mongodb://127.0.0.1:27017/sandipdatabase');

//using Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

//route and controller link
require("./routes/index")(app)


//development server
app.listen(5000, () => {
    console.log("hello from express")
})
