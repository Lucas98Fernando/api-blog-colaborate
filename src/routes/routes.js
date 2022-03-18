const { Router } = require("express");
const routes = Router();
const UserController = require("../app/controllers/UserController");

routes.post("/create-user", UserController.CreateUser);

module.exports = routes;
