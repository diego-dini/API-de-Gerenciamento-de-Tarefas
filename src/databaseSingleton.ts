import DatabaseManager from "./databaseManager";
import path from 'path';

  // Variable to store the singleton instance of DatabaseManager
  let database: DatabaseManager | null = null;

/**
 * Singleton function that initializes and provides access to a single DatabaseManager instance.
 * Ensures only one instance of the DatabaseManager is created and shared throughout the application.
 * 
 * @returns {DatabaseManager} The DatabaseManager instance.
 */
const databaseSingleton = () => {


  /**
   * Initializes the DatabaseManager instance if it has not already been created.
   */
  function initializeDatabase() {

    if (!database) {
      console.log("[INFO] Starting Database Singleton initialization...");
      // Create a new instance of DatabaseManager if none exists yet
      const dbPath = path.join(__dirname, "database.db");
      database = new DatabaseManager(dbPath)
      console.log("[INFO] Database Singleton instance successfully created.");
    }
  }

  /**
   * Returns the singleton instance of the DatabaseManager.
   * Initializes the instance if it has not been created.
   * 
   * @returns {DatabaseManager} The DatabaseManager instance.
   */
  function getDatabase(): DatabaseManager {
    // Ensure the database is initialized before returning it
    if (!database) {
      initializeDatabase();
    }

    // Return the existing DatabaseManager instance (with non-null assertion)
    return database!;
  }

  // Immediately initialize and return the singleton DatabaseManager instance
  return getDatabase();
};

export default databaseSingleton;
