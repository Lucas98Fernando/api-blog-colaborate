function isAdmin(request, response, next) {
  if (request.id_user_type === 1) return next();
  else
    return response
      .status(403)
      .json({ error: "Você não tem permissão para realizar essa ação" });
}

module.exports = isAdmin;
