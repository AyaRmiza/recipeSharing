import express, { Request, Response } from "express";
import cors from "cors";

import dotenv from "dotenv";
import "reflect-metadata";
import db from "../back/src/models"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Synchronisation de la base de données
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((err: Error) => {
    console.error("Error synchronizing the database:", err);
  });

// Route de test pour vérifier si le serveur fonctionne
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Recipe Sharing Site API!");
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`);
});
