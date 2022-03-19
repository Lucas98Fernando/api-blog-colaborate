const { Router } = require("express");
const routes = Router();
const AuthController = require("../app/controllers/AuthController");
const PostController = require("../app/controllers/PostController");

// Auth
routes.post("/register", AuthController.Register);
routes.post("/login", AuthController.Login);

// Posts
routes.post("/create-post", PostController.CreatePost);

module.exports = routes;
