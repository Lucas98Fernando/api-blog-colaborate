class HandlerExceptions {
  constructor(error = "Campos inválidos!", status = 400) {
    this.message = error;
    this.status = status;
  }
}

module.exports = HandlerExceptions;
