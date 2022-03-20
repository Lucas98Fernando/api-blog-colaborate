const express = require("express");
const cors = require("cors");
require("dotenv/config");

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
  }
}

module.exports = new App().express;
