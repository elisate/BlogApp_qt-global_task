import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
// Database configuration

const dbConfig = process.env.DATABASE_URL;
// Create a new Sequelize instance
 export const sequelize = new Sequelize(dbConfig,{
  dialect: 'postgres',
  logging: false, // Disable SQL query logging
});
