const { Router } = require("express");
const routes = Router();
const CategoryController = require("../app/controllers/CategoryController");
const AuthMiddleware = require("../middlewares/Auth");
const AdminMiddleware = require("../middlewares/Admin");

routes.post(
  "/create",
  AuthMiddleware,
  AdminMiddleware,
  CategoryController.create
);

module.exports = routes;
