import { Request, Response } from 'express';
import DatabaseManager, { DatabaseTables } from './databaseManager';
import databaseSingleton from './databaseSingleton';
import { hashString } from './hashUtils'; // Import utility for hashing passwords

import 'express-session'; // Import express-session for managing user sessions

// Extend the express-session interface to include a user object with id and login
declare module 'express-session' {
    interface SessionData {
        user: { id: number, login: string };
    }
}

// Create a singleton instance of DatabaseManager
const dbManager: DatabaseManager = databaseSingleton();

const sessionController = {
    /**
     * Handles user login by verifying credentials and creating a session.
     * The login is successful if the user's password hash matches the stored hash.
     * @param req - Express request object containing login and password.
     * @param res - Express response object for sending the login status.
     */
    login(req: Request, res: Response) {
        // Extract login and password from the request body
        const { login, password } = req.body;

        // Fetch user data from the database based on the login
        const databaseResponse = dbManager.select({ table: DatabaseTables.USER, column: "login", value: login });

        // If user is found in the database
        if (databaseResponse.content) {
            // Hash the provided password for comparison
            const hashedLoginPassword = hashString(password);

            // Compare the provided password hash with the stored hash
            if (databaseResponse.content.password === hashedLoginPassword) {
                // Store the user id and login in the session
                req.session.user = { login, id: databaseResponse.content.id };

                // Respond with a success message and session user data
                return res.json({ message: 'Login successful', user: req.session.user });
            }
        }

        // If credentials are invalid, return a 401 Unauthorized response
        return res.status(401).json({ message: 'Invalid credentials' });
    },

    /**
     * Logs the user out by destroying their session.
     * @param req - Express request object.
     * @param res - Express response object for sending the logout status.
     */
    logout(req: Request, res: Response) {
        // Destroy the user's session
        req.session.destroy((err) => {
            if (err) {
                // If an error occurs during logout, respond with a 500 Internal Server Error
                return res.status(500).json({ message: 'Logout failed' });
            }

            // Respond with a success message if logout is successful
            res.json({ message: 'Logout successful' });
        });
    },

    /**
     * Checks if the session is valid by verifying if a user is logged in.
     * Extends the session timeout by calling `touch()` on the session.
     * @param req - Express request object.
     * @returns true if the session is valid, false otherwise.
     */
    validSession(req: Request): boolean {
        if (req.session.user) {
            // Extend the session duration if the user is logged in
            req.session.touch();
            return true;
        } else {
            return false;
        }
    }
};

export default sessionController;
