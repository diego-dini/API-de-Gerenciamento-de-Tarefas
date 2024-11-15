import sqlite3 from "better-sqlite3";
import fs from "fs";
import path from "path";

/**
 * A response object representing the result of a database operation.
 * @typedef {Object} DatabaseResponse
 * @property {number} code - The status code for the operation.
 * @property {string | null} message - A message describing the result of the operation.
 * @property {any} [content] - The content returned from the operation, if any.
 */
export type DatabaseResponse = {
  code: number;
  message: string | null;
  content?: any;
};

const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  CONFLICT: 409,
};

/**
 * Enumeration for the names of database tables.
 * @enum {string}
 */
export enum DatabaseTables {
  USER = "user",
  TEAM = "team",
  CATEGORY = "category",
  PRIORITY = "priority",
  STATUS = "status",
  TASK = "task",
}

/**
 * Represents a user in the database.
 * @typedef {Object} User
 * @property {number} [id] - The unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} login - The login username of the user.
 * @property {string} password - The password of the user.
 */
export type User = {
  id?: number;
  name: string;
  email: string;
  login: string;
  password: string;
};

/**
 * Represents a team in the database.
 * @typedef {Object} Team
 * @property {number} [id] - The unique identifier for the team.
 * @property {string} name - The name of the team.
 * @property {number} owner - The ID of the user who owns the team.
 */
export type Team = {
  id?: number;
  name: string;
  owner: number;
};

/**
 * Represents a category in the database.
 * @typedef {Object} Category
 * @property {number} [id] - The unique identifier for the category.
 * @property {string} name - The name of the category.
 */
export type Category = {
  id?: number;
  name: string;
};

/**
 * Represents a priority level in the database.
 * @typedef {Object} Priority
 * @property {number} [id] - The unique identifier for the priority.
 * @property {string} name - The name of the priority.
 */
export type Priority = {
  id?: number;
  name: string;
};

/**
 * Represents a status in the database.
 * @typedef {Object} Status
 * @property {number} [id] - The unique identifier for the status.
 * @property {string} name - The name of the status.
 */
export type Status = {
  id?: number;
  name: string;
};

/**
 * Represents a task in the database.
 * @typedef {Object} Task
 * @property {number} [id] - The unique identifier for the task.
 * @property {Date} creationDate - The creation date of the task.
 * @property {Date} deadline - The deadline of the task.
 * @property {string} name - The name of the task.
 * @property {string} description - The description of the task.
 * @property {number} category - The ID of the task category.
 * @property {number} priority - The ID of the task priority.
 * @property {number} status - The ID of the task status.
 * @property {number} team - The ID of the team responsible for the task.
 * @property {number} responsible - The ID of the user responsible for the task.
 */
export type Task = {
  id?: number;
  creationDate: Date;
  deadline: Date;
  name: string;
  description: string;
  category: number;
  priority: number;
  status: number;
  team: number;
  responsible: number;
};

type DefaultData = User | Team | Category | Priority | Status | Task;

/**
 * Represents the parameters for a database request.
 *
 * @typedef {Object} RequestParams
 * @property {DatabaseTables} table - The name of the database table where the operation will take place.
 * @property {string} [column] - (Optional) The column name in the specified table to search by.
 * @property {string} [value] - (Optional) The value to search for in the specified column.
 * @property {DefaultData} [data] - (Optional) The data object containing fields to update or insert into the database row.
 */
type RequestParams = {
  table: DatabaseTables;
  column?: string;
  value?: string;
  data?: DefaultData;
};

/**
 * Manages interactions with an SQLite database.
 */
export default class DatabaseManager {
  private database: sqlite3.Database | null = null;
  private debugMode: boolean = false;

  /**
   * Initializes the database, loading or creating a database file at the specified path.
   * If the database file does not exist, it will be created based on the provided schema.
   * @param {string} databasePath - The path to the database file.
   */
  constructor(databasePath: string) {
    this.database = new sqlite3(databasePath);

    const schemaPath = path.join(__dirname, "schema.sql");
    
    if (!fs.existsSync(databasePath)) return

    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, "utf-8");
      this.database.exec(schema);
    } else {
      throw new Error("Schema file not found");
    }
  }

  /**
   * Gets the order of data columns based on the specified table.
   * @param {DatabaseTables} table - The table for which to get the column order.
   * @returns {string[]} - An array of column names in the order they should be used.
   * @throws {Error} - Throws an error if the table is not recognized.
   */
  private getTypeDataOrder(table: DatabaseTables): string[] {
    switch (table) {
      case DatabaseTables.USER:
        return ["id", "name", "email", "login", "password"];
      case DatabaseTables.CATEGORY:
        return ["id", "name"];
      case DatabaseTables.PRIORITY:
        return ["id", "name"];
      case DatabaseTables.STATUS:
        return ["id", "name"];
      case DatabaseTables.TEAM:
        return ["id", "name", "owner"];
      case DatabaseTables.TASK:
        return [
          "id",
          "creationDate",
          "deadline",
          "name",
          "description",
          "category",
          "priority",
          "status",
          "team",
          "responsible",
        ];
      default:
        throw new Error(`No Statement Set For ${table}`);
    }
  }

  /**
   * Reorders the data based on the specified column order.
   * @param {Record<string, any>} data - The data object to reorder.
   * @param {string[]} order - The desired order of columns.
   * @returns {Record<string, any>} - The reordered data object.
   */
  private reorderData(data: Record<string, any>, order: string[]): Record<string, any> {
    return Object.fromEntries(order.map((key) => [key, data[key]]));
  }

  /**
   * Inserts a new record into the specified table.
   * @param {RequestParams} request - The parameters for the insert operation.
   * @returns {DatabaseResponse} - The result of the insert operation.
   * @throws {Error} - Throws an error if data is null.
   */
  public insert(request: RequestParams): DatabaseResponse {
    try {
      if (!request.data) throw new Error(`Data can't be null`);
      const dataOrder = this.getTypeDataOrder(request.table);
      dataOrder.splice(dataOrder.indexOf("id"), 1); // Remove id from the insert
      const reorderedData = this.reorderData(request.data, dataOrder);

      const columns = Object.keys(reorderedData).join(", ");
      const placeholders = Object.keys(reorderedData)
        .map(() => "?")
        .join(", ");
      const values = Object.values(reorderedData);

      const stmt = this.database?.prepare(
        `INSERT INTO ${request.table.toLowerCase()} (${columns}) VALUES (${placeholders})`
      );
      const info = stmt?.run(...values);
      return { code: 201, message: "Operation Succeeded", content: info };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Deletes a record from the specified table based on a column value.
   * @param {RequestParams} request - The parameters for the delete operation.
   * @returns {DatabaseResponse} - The result of the delete operation.
   * @throws {Error} - Throws an error if the column or value is missing or invalid.
   */
  public delete(request: RequestParams): DatabaseResponse {
    try {
      if (!request.column || !request.value) throw new Error(`Invalid Request Parameters`);

      const dataOrder = this.getTypeDataOrder(request.table);
      const column = request.column;

      if (!dataOrder.includes(column)) throw new Error(`Invalid column ${column} in ${request.table}`);

      const stmt = this.database?.prepare(`DELETE FROM ${request.table.toLowerCase()} WHERE ${column} = ?`);
      const info = stmt?.run(request.value);
      return { code: 200, message: "Operation Succeeded", content: info };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Updates a record in the specified table based on a column value.
   * @param {RequestParams} request - The parameters for the update operation.
   * @returns {DatabaseResponse} - The result of the update operation.
   * @throws {Error} - Throws an error if the column, value, or data is missing or invalid.
   */
  public update(request: RequestParams): DatabaseResponse {
    try {
      if (!request.column || !request.value) throw new Error(`Invalid Request Parameters`);
      if (!request.data) throw new Error(`Data can't be null`);

      const dataOrder = this.getTypeDataOrder(request.table);
      dataOrder.splice(dataOrder.indexOf(request.column), 1);

      const reorderedData = this.reorderData(request.data, dataOrder);

      const columns = Object.keys(reorderedData)
        .map((column) => `${column} = ?`)
        .join(", ");
      const values = Object.values(reorderedData);

      const stmt = this.database?.prepare(
        `UPDATE ${request.table.toLowerCase()} SET ${columns} WHERE ${request.column} = ?`
      );

      const info = stmt?.run(...values, request.value);

      return { code: 200, message: "Operation Succeeded", content: info };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Selects a record from the specified table based on a column value.
   * @param {RequestParams} request - The parameters for the select operation.
   * @returns {DatabaseResponse} - The result of the select operation.
   */
  public select(request: RequestParams): DatabaseResponse {
    try {
      if (!request.column || !request.value) throw new Error(`Invalid Request Parameters`);
      const stmt = this.database?.prepare(
        `SELECT * FROM ${request.table.toLowerCase()} WHERE ${request.column} = ?`
      );
      const info = stmt?.get(request.value);
      return { code: 200, message: "Operation Succeeded", content: info };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Adds a member to a team.
   * @param {number} teamId - The ID of the team to which the member will be added.
   * @param {number} userId - The ID of the user to be added to the team.
   * @returns {DatabaseResponse} - The result of the operation.
   */
  public addTeamMember(teamId: number, userId: number): DatabaseResponse {
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
   * @param {number} teamId - The ID of the team from which the member will be removed.
   * @param {number} userId - The ID of the user to be removed from the team.
   * @returns {DatabaseResponse} - The result of the remove operation.
   */
  public removeTeamMember(teamId: number, userId: number): DatabaseResponse {
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
   * Removes all members from a team.
   * @param {number} teamId - The ID of the team from which all members will be removed.
   * @returns {DatabaseResponse} - The result of the remove operation.
   */
  public removeAllTeamMembers(teamId: number): DatabaseResponse {
    try {
      const stmt = this.database?.prepare("DELETE FROM team_members WHERE team_id = ?");
      stmt?.run(teamId);
      return { code: 200, message: "All Team Members Removed" };
    } catch (err) {
      return this.errorDefaultHandler(err);
    }
  }

  /**
   * Handles errors by logging them (if debug mode is enabled) and returning a standardized error response.
   * @param {any} err - The error to handle.
   * @returns {DatabaseResponse} - The standardized error response.
   */
  private errorDefaultHandler(err: any): DatabaseResponse {
    if (this.debugMode) {
      console.error("Database Error:", err);
    }
  
    return {
      code: 400,
      message: "Bad Request",
      content: null,
    };
  }
}
