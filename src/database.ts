import DatabaseManager from "./databaseManager";
/**
 * Singleton function that initializes and provides access to a DatabaseManager instance.
 * @returns {DatabaseManager} The DatabaseManager instance.
 */
const databaseSingleton = () => {
  let database: DatabaseManager | null = null;

  function initializeDatabase() {
    if (!database) {
      // Create a new DatabaseManager instance if none exists
      database = new DatabaseManager(__dirname + "/database.db");
    }
  }

  function getDatabase(): DatabaseManager {
    if (!database) {
      initializeDatabase();
    }

    // Return the existing DatabaseManager instance
    return database!;
  }

  // Immediately initialize and return the DatabaseManager instance
  return getDatabase();
};

export default databaseSingleton;
