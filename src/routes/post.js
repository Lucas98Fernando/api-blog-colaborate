const { Router } = require("express");
const routes = Router();
const PostController = require("../app/controllers/PostController");
const AuthMiddleware = require("../middlewares/auth");

// POST
routes.post("/create", AuthMiddleware, PostController.createPost);

// GET
routes.get("/get-all", AuthMiddleware, PostController.getAll);
routes.get("/get-by-user", AuthMiddleware, PostController.getByUser);
routes.get("/get-approved", PostController.getApproved);
routes.get(
  "/get-waiting-approval",
  AuthMiddleware,
  PostController.getWaitingApproval
);

module.exports = routes;
