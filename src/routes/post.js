const { Router } = require("express");
const routes = Router();
const PostController = require("../app/controllers/PostController");

routes.post("/create", PostController.CreatePost);

module.exports = routes;
