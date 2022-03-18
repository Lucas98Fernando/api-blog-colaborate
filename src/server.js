const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.info(`API rodando em: http://localhost:${PORT}`)
);
