import DatabaseManager from "./databaseManager";

/**
 * The response that the database will send back in every request.
 * @typedef {Object} DatabaseResponse
 * @property {number} code - The status code for the operation.
 * @property {string | null} message - The message of the response, usually containing what the function succeeded in doing.
 * @property {any} [content] - The content of the current view based on the request to the database.
 */
export type DatabaseResponse = {
  code: number;
  message: string | null;
  content?: any;
};

/**
 * The user type used by the database.
 * @typedef {Object} User
 * @property {number} id - ID of the user.
 * @property {string} name - Name of the user.
 * @property {string} login - Login of the user.
 * @property {string} password - Password of the user.
 */
export type User = {
  id?: number;
  name: string;
  login: string;
  password: string;
};

/**
 * The team type used by the database.
 * @typedef {Object} Team
 * @property {number} id - ID of the team.
 * @property {string} name - Name of the team.
 * @property {number} owner - User id that control the team.
 */
export type Team = {
  id?: number;
  name: string;
  owner: number;
};

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
