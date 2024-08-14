import sqlite3, { RunResult } from "better-sqlite3";
import { User, Team, Category, Priority, Status, DatabaseResponse } from "./database";
import fs from "fs";
import path from "path";

/**
 * Manages interactions with the SQLite database.
 */
export default class DatabaseManager {
  database: sqlite3.Database | null = null;
  debugMode: boolean = true;

  /**
   * Initializes the database, loading or creating a database file at the specified path.
   * If the database file does not exist, it will be created based on the provided schema.
   * @param {string} databasePath - The path to the database file.
   */
  constructor(databasePath: string) {
    // Load or create the database at the specified path
    this.database = new sqlite3(databasePath);

    // Path to the SQL schema file
    const schemaPath = path.join(__dirname, "schema.sql");

    // Read and execute the SQL schema
    const schema = fs.readFileSync(schemaPath, "utf-8");
    this.database.exec(schema);
  }

  /**
   * Adds a new user to the database.
   * @param {User} user - The user to be added to the database.
   * @returns {DatabaseResponse} - The database response after attempting to add the user.
   */
  addUser(user: User): DatabaseResponse {
    try {
      const stmt = this.database?.prepare(
        "INSERT INTO user (name, login, email, password) VALUES (?, ?, ?, ?)"
      );
      stmt?.run(user.name, user.login, user.email, user.password);
      return { code: 201, message: "User Created" };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Deletes a user from the database based on the user ID.
   * @param {number} userId - The ID of the user to be deleted.
   * @returns {DatabaseResponse} - The database response indicating the status of the delete operation.
   */
  deleteUser(userId: number): DatabaseResponse {
    try {
      const stmt = this.database?.prepare("DELETE FROM user WHERE id = ?");
      stmt?.run(userId);
      return { code: 202, message: "User Deleted" };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Updates a user's information in the database based on the provided user object.
   * @param {User} user - The updated user object containing new information.
   * @returns {DatabaseResponse} - The database response indicating the status of the update operation.
   */
  updateUser(user: User): DatabaseResponse {
    try {
      const stmt = this.database?.prepare(
        "UPDATE user SET name = ?, login = ?, email = ?, password = ? WHERE id = ?"
      );
      stmt?.run(user.name, user.login, user.email, user.password, user.id);
      return { code: 202, message: "User Updated" };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Retrieves user information from the database based on the user ID.
   * @param {number} userId - The ID of the user to retrieve.
   * @returns {DatabaseResponse} - The database response containing the user information if found.
   */
  getUser(userId: number): DatabaseResponse {
    try {
      const stmt = this.database?.prepare("SELECT * FROM user WHERE id = ?");
      const userInformation = stmt?.get(userId);
      return { code: 200, message: "User Retrieved", content: userInformation };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Creates a new team with the provided information.
   * @param {Team} team - Information about the team to be created.
   * @returns {DatabaseResponse} - The database response after attempting to add the team.
   */
  addTeam(team: Team): DatabaseResponse {
    try {
      const stmt = this.database?.prepare(
        "INSERT INTO team (name, owner) VALUES (?, ?)"
      );
      stmt?.run(team.name, team.owner);
      return { code: 200, message: "Team Created" };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Deletes a team by its ID.
   * @param {number} teamId - The ID of the team to be deleted.
   * @returns {DatabaseResponse} - The database response after attempting to delete the team.
   */
  deleteTeam(teamId: number): DatabaseResponse {
    try {
      const stmt = this.database?.prepare("DELETE FROM team WHERE id = ?");
      stmt?.run(teamId);
      return { code: 200, message: "Team Deleted" };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Updates the information of an existing team.
   * @param {Team} team - The updated team information.
   * @returns {DatabaseResponse} - The database response after attempting to update the team.
   */
  updateTeam(team: Team): DatabaseResponse {
    try {
      const stmt = this.database?.prepare(
        "UPDATE team SET name = ?, owner = ? WHERE id = ?"
      );
      stmt?.run(team.name, team.owner, team.id!);
      return { code: 200, message: "Team Updated" };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Retrieves a team's information by its ID.
   * @param {number} teamId - The ID of the team to be retrieved.
   * @returns {DatabaseResponse} - The database response after attempting to retrieve the team.
   */
  getTeam(teamId: number): DatabaseResponse {
    try {
      const stmt = this.database?.prepare("SELECT * FROM team WHERE id = ?");
      const teamInformation = stmt?.get(teamId);
      return { code: 200, message: "Team Retrieved", content: teamInformation };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Adds a member to a team.
   * @param {number} teamId - The ID of the team.
   * @param {number} userId - The ID of the user to be added to the team.
   * @returns {DatabaseResponse} - The database response after attempting to add the member.
   */
  addTeamMember(teamId: number, userId: number): DatabaseResponse {
    try {
      const stmt = this.database?.prepare(
        "INSERT INTO team_members (team_id, user_id) VALUES (?, ?)"
      );
      stmt?.run(teamId, userId);
      return { code: 200, message: "Team Member Added" };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Removes a member from a team.
   * @param {number} teamId - The ID of the team.
   * @param {number} userId - The ID of the user to be removed from the team.
   * @returns {DatabaseResponse} - The database response after attempting to remove the member.
   */
  removeTeamMember(teamId: number, userId: number): DatabaseResponse {
    try {
      const stmt = this.database?.prepare(
        "DELETE FROM team_members WHERE team_id = ? AND user_id = ?"
      );
      stmt?.run(teamId, userId);
      return { code: 200, message: "Team Member Removed" };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Creates a new category to be used 
   * @param category - Category to be created
   * @returns - Request status
   */
  addCategory(category: Category): DatabaseResponse {
    try {
      const stmt = this.database?.prepare("INSERT INTO category (name) VALUES (?)");
      stmt?.run(category.name);
      return { code: 200, message: "Category Created" };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Deletes a category from the database
   * @param categoryId - ID of the category to be deleted
   * @returns - Request status
   */
  deleteCategory(categoryId: number): DatabaseResponse {
    try {
      const stmt = this.database?.prepare("DELETE FROM category WHERE id = ?");
      stmt?.run(categoryId);
      return { code: 200, message: "Category Deleted" };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Updates the specified category name
   * @param category - New category to override the current one
   * @returns - Request status
   */
  updateCategory(category: Category): DatabaseResponse {
    try {
      const stmt = this.database?.prepare("UPDATE category SET name = ? WHERE id = ?");
      stmt?.run(category.name, category.id);
      return { code: 200, message: "Category Updated" };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Retrieves a category from the database
   * @param categoryId - ID of the category to be retrieved
   * @returns - Request status and content
   */
  getCategory(categoryId: number): DatabaseResponse {
    try {
      const stmt = this.database?.prepare("SELECT * FROM category WHERE id = ?");
      const categoryInformation = stmt?.get(categoryId);
      return { code: 200, message: "Category Retrieved", content: categoryInformation };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Default error handler for the database manager.
   * @param {any} err - The caught error.
   * @returns {DatabaseResponse} - A DatabaseResponse object with a code of 400.
   */
  errorDefaultHandler(err: any): DatabaseResponse {
    // Log the error to the console if debug mode is enabled
    if (this.debugMode) {
      console.error("Database Error:", err);
    }

    // Return a standardized error response
    return {
      code: 400,
      message: "Bad Request",
      content: err,
    };
  }

}
