const { Router } = require("express");
const routes = Router();
const PostController = require("../app/controllers/PostController");
const AuthMiddleware = require("../middlewares/auth");
const AdminMiddleware = require("../middlewares/Admin");

// POST
routes.post("/create", AuthMiddleware, PostController.create);

// PUT
routes.put(
  "/approval/:idPost",
  AuthMiddleware,
  AdminMiddleware,
  PostController.approval
);
routes.put("/update/:idPost", AuthMiddleware, PostController.update);

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
