const { Router } = require("express");
const routes = Router();

routes.get("/", (request, response) => {
  response.send("Olá!");
});

module.exports = routes;
