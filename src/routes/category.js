const { Router } = require("express");
const routes = Router();
const CategoryController = require("@controllers/CategoryController");
const AuthMiddleware = require("@middlewares/Auth");
const AdminMiddleware = require("@middlewares/Admin");

routes.post(
  "/create",
  AuthMiddleware,
  AdminMiddleware,
  CategoryController.create
);
routes.put(
  "/update/:idCategory",
  AuthMiddleware,
  AdminMiddleware,
  CategoryController.update
);
routes.delete(
  "/delete/:idCategory",
  AuthMiddleware,
  AdminMiddleware,
  CategoryController.delete
);
routes.get("/get-all", AuthMiddleware, CategoryController.getAll);

module.exports = routes;
