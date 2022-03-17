const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
require("dotenv/config");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(routes);

app.listen(PORT, () =>
  console.info(`API rodando em: http://localhost:${PORT}`)
);
