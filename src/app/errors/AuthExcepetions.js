class AuthError {
  constructor(error = "Campos inválidos!") {
    this.error = error;
  }
}

module.exports = AuthError;
