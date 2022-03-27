require("dotenv/config");

module.exports = {
  host: process.env.HOST_MAIL,
  port: process.env.PORT_MAIL,
  user: process.env.USER_MAIL,
  pass: process.env.PASS_MAIL,
};
