const jwt = require("jsonwebtoken");
const authConfig = require("@config/auth");

function Authorization(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization)
    return response
      .status(401)
      .json({ error: "Credenciais inválidas, faça login novamente!" });

  const parts = authorization.split(" ");

  if (!parts.length === 2)
    return response.status(401).json({ error: "Token inválido!" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return response.status(401).json({ error: "Formato de token incorreto!" });

  jwt.verify(token, authConfig.secret, (error, decoded) => {
    if (error)
      response.status(401).json({ error: "Token inválido para utilização" });
    const { id, idUserType } = decoded.params;
    request.userId = id;
    request.idUserType = idUserType;
    return next();
  });
}

module.exports = Authorization;
