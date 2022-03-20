const { Router } = require("express");
const routes = Router();
const CategoryController = require("../app/controllers/CategoryController");

routes.post("/create", CategoryController.create);

module.exports = routes;
