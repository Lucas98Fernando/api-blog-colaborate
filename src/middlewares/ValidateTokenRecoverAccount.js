const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");

function ValidateTokenRecoverAccount(request, response, next) {
  const { token } = request.params;

  if (!token)
    return response.status(400).json({ error: "Informe um token válido!" });

  jwt.verify(token, authConfig.secret, (error, decoded) => {
    if (error)
      response.status(400).json({ error: "Token inválido, solicite um novo." });

    const { email } = decoded.params;
    request.email_recover_account = email;
    return next();
  });
}

module.exports = ValidateTokenRecoverAccount;
