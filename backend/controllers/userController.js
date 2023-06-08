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
exports.getUser = (req, res) => {
    res.json({
        user: "none"
    })
}
