const { Router } = require("express");
const routes = Router();
const AuthController = require("../app/controllers/AuthController");
const ValidateTokenRecoverAccount = require("../middlewares/ValidateTokenRecoverAccount");

routes.get(
  "/recover-account/validate-token/:token",
  AuthController.recoverAccountValidateToken
);

routes.post("/register", AuthController.register);
routes.post("/login", AuthController.login);
routes.post("/forgot-password", AuthController.forgotPassword);

routes.put("/recover-account", AuthController.recoverAccount);

module.exports = routes;
