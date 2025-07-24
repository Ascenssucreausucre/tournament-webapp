import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import sequelize from "../config/sequelize";
import { Model } from "sequelize";

// Recréer __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Objet qui contiendra tous les modèles
const models: Record<string, typeof Model> = {};

const files = fs.readdirSync(__dirname).filter(
  (file) =>
    file !== "index.ts" && (file.endsWith(".ts") || file.endsWith(".js")) // ← support dev et build
);

for (const file of files) {
  const filePath = pathToFileURL(path.join(__dirname, file)).href;
  const modelModule = await import(filePath);

  const model =
    modelModule.default?.initModel?.(sequelize) ??
    modelModule.initModel?.(sequelize);

  if (!model) {
    console.warn(`⚠️  Aucun modèle exporté par ${file}`);
    continue;
  }

  models[model.name] = model;
}

// Appel des méthodes d'association si elles existent
Object.values(models).forEach((model: any) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

export default models;
