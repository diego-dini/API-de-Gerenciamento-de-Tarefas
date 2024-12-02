import { Request, Response } from "express";
import DatabaseManager, { DatabaseResponse, DatabaseTables } from "./databaseManager";
import databaseSingleton from "./databaseSingleton";
import { hashString } from "./hashUtils";
import sessionController from "./sessionController";
import validator from "validator";

console.log("[INFO] Loading User Controller...");

// Create a singleton instance of DatabaseManager to ensure a single point of database access
const dbManager: DatabaseManager = databaseSingleton();

/**
 * Interface for the User Controller.
 */
export interface IUserController {
    /**
     * Handles user registration.
     * @param req - Express request object containing user data in the body.
     * @param res - Express response object.
     */
    create(req: Request, res: Response): void;

    /**
     * Handles user updates.
     * @param req - Express request object containing user data in the body.
     * @param res - Express response object.
     */
    update(req: Request, res: Response): void;
}

const userController: IUserController = {
    create(req: Request, res: Response) {
        // Validate the email format
        if (!validator.isEmail(req.body.email)) {
            return res.status(400).json({ message: "Invalid E-Mail Address" });
        }

        // Check if the login already exists in the database
        const existLogin: DatabaseResponse = dbManager.select({
            table: DatabaseTables.USER,
            column: "login",
            value: req.body.login,
        });

        // Check if the email already exists in the database
        const existEmail: DatabaseResponse = dbManager.select({
            table: DatabaseTables.USER,
            column: "email",
            value: req.body.email,
        });

        // If either the login or email already exists, return a conflict message
        if (existLogin.content || existEmail.content) {
            const conflictMessage =
                existLogin.content && existEmail.content
                    ? "Login and Email are already registered."
                    : existLogin.content
                    ? "Login is already registered."
                    : "Email is already registered.";

            // Respond with a 409 status code for conflict
            return res.status(409).json({ message: conflictMessage });
        }

        // Create a new user object, hashing the password and normalizing the email
        const newUser = {
            name: req.body.name,
            email: validator.normalizeEmail(req.body.email),
            login: req.body.login,
            password: hashString(req.body.password), // Securely hash the password
        };

        // Insert the new user into the database
        const newUserResponse: DatabaseResponse = dbManager.insert({
            table: DatabaseTables.USER,
            data: newUser,
        });

        // Insert a new team into the database
        const newTeamResponse = dbManager.insert({
            table: DatabaseTables.TEAM,
            data: { name: `${newUser.name} Team`, owner: newUserResponse.content.lastInsertRowid }
        });

        // Add the new user as member and owner of the new team
        dbManager.addTeamMember(newTeamResponse.content.lastInsertRowid, newUserResponse.content.lastInsertRowid);

        // Respond with the database response message and status code
        res.status(newUserResponse.code).json({ message: newUserResponse.message });
    },

    update(req: Request, res: Response) {
        // Verify if the session is valid
        if (!sessionController.validSession(req)) {
            return res.status(400).json({ message: "Invalid Session" });
        }

        // Check if the login in the session matches the login provided in the request
        const sessionUserLogin = req.session.user?.login;
        if (!sessionUserLogin || sessionUserLogin !== req.body.login) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        // Validate the email format
        if (!validator.isEmail(req.body.email)) {
            return res.status(400).json({ message: "Invalid E-Mail Address" });
        }

        // Check if the provided email already exists in the database
        const existEmail: DatabaseResponse = dbManager.select({
            table: DatabaseTables.USER,
            column: "email",
            value: req.body.email,
        });

        // If the email exists and is not associated with the current user, return a conflict message
        if (existEmail.content && existEmail.content.login !== req.body.login) {
            return res.status(409).json({ message: "Email is already registered." });
        }

        // Get the current user information from the database
        const oldUserInformation: DatabaseResponse = dbManager.select({
            table: DatabaseTables.USER,
            column: "login",
            value: req.body.login,
        });

        // If the user is not found, respond with a 404 status
        if (!oldUserInformation.content) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new user information object, preserving old data if new data is not provided
        const newUserInformation = {
            id: oldUserInformation.content.id, // Include user ID for the update
            name: req.body.name || oldUserInformation.content.name,
            email: validator.normalizeEmail(req.body.email) || oldUserInformation.content.email,
            login: req.body.login,
            password: req.body.password
                ? hashString(req.body.password)
                : oldUserInformation.content.password,
        };

        // Update the user information in the database
        const updateResponse: DatabaseResponse = dbManager.update({
            table: DatabaseTables.USER,
            column: "login", // Specify the column to match for the update
            data: newUserInformation,
            value: req.body.login,
        });

        // Respond with the status code and a success message
        res.status(updateResponse.code).json({ message: "User information updated successfully" });
    },
};

// Export the user controller for use in routes
export default userController;
