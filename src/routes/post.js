const { Router } = require("express");
const routes = Router();
const PostController = require("../app/controllers/PostController");

routes.post("/create", PostController.createPost);

module.exports = routes;
