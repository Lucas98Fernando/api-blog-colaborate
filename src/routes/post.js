const { Router } = require("express");
const routes = Router();
const PostController = require("../app/controllers/PostController");
const AuthMiddleware = require("../middlewares/auth");

routes.post("/create", AuthMiddleware, PostController.createPost);

module.exports = routes;
