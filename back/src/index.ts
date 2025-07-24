import app from "./app.ts";

const PORT = process.env.API_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
