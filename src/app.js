// Core modules
const express = require("express");
const cors = require("cors");
require("dotenv/config");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocsV1 = require("./docs/v1/swagger.json");

// Module routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const categoryRoutes = require("./routes/category");

class App {
  express = express.application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cors());
  }

  routes() {
    this.express.use("/auth", authRoutes);
    this.express.use("/post", postRoutes);
    this.express.use("/category", categoryRoutes);
    this.express.use(
      "/v1/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocsV1)
    );
    // static folder
    this.express.use("/uploads", express.static("../uploads"));
  }
}

module.exports = new App().express;
