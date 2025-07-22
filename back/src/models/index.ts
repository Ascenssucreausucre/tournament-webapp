import fs from "fs";
import path from "path";
import { sequelize } from "../config/sequelize";
import { Model, Sequelize } from "sequelize";

// Objet qui contiendra tous les modèles
const models: Record<string, typeof Model> = {};

// Lecture des fichiers du dossier courant (sauf index.ts)
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.ts" && file.endsWith(".ts"))
  .forEach((file) => {
    const modelModule = require(path.join(__dirname, file));
    const model = modelModule.default?.initModel
      ? modelModule.default.initModel(sequelize)
      : modelModule(sequelize);

    models[model.name] = model;
  });

// Appel des méthodes d'association si elles existent
Object.values(models).forEach((model: any) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

export { sequelize };
export default models;
