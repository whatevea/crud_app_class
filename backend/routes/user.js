const controllers = require("../controllers/userController")
module.exports = (app) => {
    app.post("/register", controllers.registerUser)
    app.get("/user", controllers.getUser)
    app.get("/users", controllers.allUsers)
    app.delete("/user", controllers.deleteUser)
}