const User = require("../models/userSchema")
exports.registerUser = (req, res) => {
    const { password, email, phone_number } = req.body;
    const user = new User({
        email: email,
        password: password,
        phone: phone_number
    })
    user.save().then(data => {
        res.json(user)
    })
}
exports.deleteUser = (req, res) => {
    console.log(req)
    User.deleteOne({ _id: req.body.id }).then(data => {
        console.log("successfully deleted")
        res.json({ message: "Successfuly delted user" })
    })
}
exports.getUser = (req, res) => {
    res.json({
        user: "none"
    })
}
exports.allUsers = (req, res) => {
    User.find().then(data => {
        res.json({ data })
    })
}

