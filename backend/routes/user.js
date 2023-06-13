const controllers = require("../controllers/userController")

module.exports = (app) => {
    console.log({ key: `${process.env.APP_VERSION}/register` })
    app.post(`/${process.env.APP_VERSION}/register`, controllers.registerUser)
    app.get(`/${process.env.APP_VERSION}/user`, controllers.getUser)
    app.get(`/${process.env.APP_VERSION}/users`, controllers.allUsers)
    app.delete(`/${process.env.APP_VERSION}/user`, controllers.deleteUser)
}

