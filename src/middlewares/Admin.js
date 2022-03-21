function isAdmin(request, response, next) {
  console.log(request.idUserType);
  if (request.idUserType === 1) return next();
  else
    return response
      .status(403)
      .json({ error: "Você não tem permissão para acessar esse conteúdo" });
}

module.exports = isAdmin;