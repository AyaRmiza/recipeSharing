import * as dotenv from "dotenv";
import dbConfig from "../db/dbconfig";
import { Sequelize } from "sequelize-typescript";

// Load environment variables
dotenv.config();

// Initialize Sequelize with configuration parameters
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "mysql", 
  models: [__dirname + "/models"], 
});

// Import models
import { User } from "./user";
import { Recipe } from "./recipe";
import { Post } from "./post";
import { Ingredient } from "./ingredient";
import { Comment } from "./comment";

// Initialize models with Sequelize instance
sequelize.addModels([User, Recipe, Post, Ingredient, Comment]);

// Create a database object to hold all models
const db: {
  [key: string]: any;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
} = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  User,
  Recipe,
  Post,
  Ingredient,
  Comment,
};

export default db;
