const { Router } = require("express");
const routes = Router();
const AuthController = require("../app/controllers/AuthController");

routes.post("/register", AuthController.Register);
routes.post("/login", AuthController.Login);

module.exports = routes;
