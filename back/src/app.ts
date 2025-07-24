import express, { NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import sequelize from "./config/sequelize.ts";
import routes from "./routes/index.ts";

dotenv.config();
const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("public/uploads"));

const FRONT_URL = process.env.FRONT_URL;
const DASHBOARD_URL = process.env.DASHBOARD_URL;

if (!FRONT_URL || !DASHBOARD_URL) {
  throw new Error(
    "FRONT_URL and DASHBOARD_URL must be defined in the .env file"
  );
}

// Configuration CORS
const corsOptions: CorsOptions = {
  origin: [FRONT_URL, DASHBOARD_URL] as string[],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions)); // Applique la configuration CORS à l'application

app.use("/public", express.static("public")); // pour les images
app.use("/api", routes);

// Synchronisation avec la base de données
sequelize
  .sync({ alter: true })
  .then(() => console.log("Base de données synchronisée."))
  .catch((err: any) => console.error("Erreur de synchronisation :", err));

// Gestion des erreurs globale
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Si tu veux logguer l'erreur de manière détaillée en développement :
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack); // Affiche la stack complète de l'erreur
  } else {
    // En production, tu peux garder juste l'erreur principale
    console.error(err.message); // Ou juste le message d'erreur
  }

  // Vérifie si l'erreur a un statut HTTP et utilise-le, sinon envoie 500
  const statusCode = 500;
  const message = err.message || "Quelque chose s'est mal passé !";

  // Envoie une réponse avec un message détaillé
  res.status(statusCode).json({
    error: message, // Message d'erreur
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Seulement en dev
  });
});

export default app;
