const path = require("path");
const nodemailer = require("nodemailer");
const handlebars = require("nodemailer-express-handlebars");
const { host, port, user, pass } = require("@config/mail");

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass },
});

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
