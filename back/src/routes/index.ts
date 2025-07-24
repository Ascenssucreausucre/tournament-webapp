import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const router = express.Router();

// Recréation de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesPath = __dirname;

fs.readdirSync(routesPath).forEach(async (file) => {
  if (file !== "index.ts" && file.endsWith(".ts")) {
    const modulePath = pathToFileURL(path.join(routesPath, file)).href;
    const routeModule = await import(modulePath);

    const route = routeModule.default;

    const baseName = file.replace("Routes.ts", "").replace(".ts", "");
    const routeName = baseName
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();

    const fullPath = `/${routeName}`;
    router.use(fullPath, route);

    console.log(`✅ Route loaded : /api${fullPath} -> ${file}`);
  }
});

export default router;
