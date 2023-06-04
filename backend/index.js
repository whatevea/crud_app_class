var cors = require('cors');
const express = require("express")
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const app = express()
// importing schema
const User = require("./models/userSchema")
//connecting
mongoose.connect('mongodb://127.0.0.1:27017/sandipdatabase');




//using Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())



app.get('/users', (req, res) => {
    res.json({
        user: "none"
    })
})

//register route
app.post("/register", (req, res) => {
    console.log("data recevived are ", req.body)
    const { password, email, phone_number } = req.body;
    const user = new User({ email: email, password: password, phone: phone_number })
    user.save().then(data => {
        res.json({ user })
    })

})




app.get('/', (req, res) => {
    res.json({
        name: "sandiph bamdrel",
        requests: req.body
    })
})


app.post("/users", (req, res) => {
    // const Users = mongoose.model("Users", { email: String, password: String })
    // const user = new Users({ email: req.body.email, password: req.body.password })
    // user.save()
    // console.log(req.body.email)

    // const Cat = mongoose.model('Cat', { name: String });
    // const kitty = new Cat({ name: 'Zildjian' });
    // kitty.save().then(() => res.json({ kitty }));



})
app.listen(5000, () => {
    console.log("hello from express")
})
