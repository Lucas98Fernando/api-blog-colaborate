const path = require("path");
const nodemailer = require("nodemailer");
const handlebars = require("nodemailer-express-handlebars");
const mailConfig = require("../config/mail");

const currentEnvironment = process.env.NODE_ENV;

const transport = nodemailer.createTransport(mailConfig[currentEnvironment]);

transport.use(
  "compile",
  handlebars({
    viewEngine: {
      defaultLayout: undefined,
      partialsDir: path.resolve("./src/email/templates/"),
    },
    viewPath: path.resolve("./src/email/templates/"),
    extName: ".html",
  })
);

module.exports = transport;
