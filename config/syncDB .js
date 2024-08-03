import { seedDatabase } from "../src/controllers/seederController.js";
import { sequelize } from "./config.js";

// Define an asynchronous function to synchronize the database
export const syncDB = async () => {
  try {
    // Sync models to the database. `{ force: true }` drops existing tables and recreates them.
    // await sequelize.sync({ force: true });
    await sequelize.sync({ alter: true })
    // Use { alter: true } to avoid dropping tables

    // Log a success message to the console if synchronization is successful
    console.log('Database synced!')
    // Retrieve table names
    const tables = await sequelize.getQueryInterface().showAllTables()
    // Retrieve column information for each table
    const tableDetails = {}
    for (const table of tables) {
      const columns = await sequelize.getQueryInterface().describeTable(table)
      tableDetails[table] = columns
    }
    return {
      success: true,
      message: 'Database synced!',
      tables: tableDetails
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to sync database',
      error: error.message
    }
  }
}
