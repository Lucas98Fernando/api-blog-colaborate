require("dotenv/config");

module.exports = {
  development: {
    host: process.env.HOST_MAIL,
    port: process.env.PORT_MAIL,
    auth: { user: process.env.USER_MAIL, pass: process.env.PASS_MAIL },
  },
  production: {
    service: "hotmail",
    auth: { user: process.env.USER_MAIL, pass: process.env.PASS_MAIL },
  },
};
