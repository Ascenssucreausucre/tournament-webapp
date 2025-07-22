import { Express } from "express";

const app: Express = require("./src/app");
const PORT = process.env.POSTGRES_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
