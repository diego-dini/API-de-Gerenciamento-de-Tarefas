import { Request, Response } from "express";
import sessionController from "./sessionController";
import DatabaseManager, { DatabaseTables } from "./databaseManager";
import databaseSingleton from "./databaseSingleton";

console.log("[INFO] Loading Team Controller...");

// Create a singleton instance of DatabaseManager to ensure a single point of database access
const dbManager: DatabaseManager = databaseSingleton();

/**
 * Interface for the Team Controller.
 */
export interface ITeamController {
    /**
     * Creates a new team if the session is valid.
     * @param req - Express request object, containing team data in the body.
     * @param res - Express response object.
     */
    create(req: Request, res: Response): void;

    /**
     * Deletes a team if the session is valid and the requesting user is the team owner.
     * @param req - Express request object, containing team id in the body.
     * @param res - Express response object.
     */
    delete(req: Request, res: Response): void;

    /**
     * Updates a team's details if the session is valid and the requesting user is the team owner.
     * @param req - Express request object, containing team data and id in the body.
     * @param res - Express response object.
     */
    update(req: Request, res: Response): void;
}

const teamController: ITeamController = {
    create(req: Request, res: Response) {
        // Validate session
        if (sessionController.validSession(req)) {
            const newTeam = {
                name: req.body.name, // Team name from request body
                owner: req.body.owner || req.session.user?.id! // Owner defaults to the session user
            };

            // Insert new team into the database
            const newTeamResponse = dbManager.insert({ table: DatabaseTables.TEAM, data: newTeam });
            
            // Add the owner as a member of the newly created team
            dbManager.addTeamMember(newTeamResponse.content.lastInsertRowid, newTeam.owner);

            // Return the response with the status code and message
            res.status(newTeamResponse.code).json({ message: newTeamResponse.message, content: newTeamResponse.content });
        } else {
            // If the user is not authenticated, return a 401 Unauthorized status
            return res.status(401).json({ message: "User not authenticated" });
        }
    },

    delete(req: Request, res: Response) {
        // Validate session
        if (sessionController.validSession(req)) {
            const teamId = req.body.id; // Team ID from request body

            // Fetch the team from the database
            const team = dbManager.select({ table: DatabaseTables.TEAM, column: 'id', value: teamId });

            // If team does not exist, return a 400 Bad Request status
            if (!team.content) {
                return res.status(400).json({ message: "Invalid team id" });
            }

            // Check if the requesting user is the team owner
            if (team.content.owner !== req.session.user!.id) {
                return res.status(401).json({ message: "User not authorized" });
            }

            // Remove all team members before deleting the team
            dbManager.removeAllTeamMembers(teamId);

            // Delete the team from the database
            const databaseResponse = dbManager.delete({ table: DatabaseTables.TEAM, column: 'id', value: teamId });

            // Return the response with the status code and message
            res.status(databaseResponse.code).json({ message: databaseResponse.message });
        } else {
            // If the user is not authenticated, return a 401 Unauthorized status
            return res.status(401).json({ message: "User not authenticated" });
        }
    },

    update(req: Request, res: Response) {
        // Validate session
        if (sessionController.validSession(req)) {
            const teamId = req.body.id; // Team ID from request body

            // Fetch the team from the database
            const team = dbManager.select({ table: DatabaseTables.TEAM, column: 'id', value: teamId });

            // If team does not exist, return a 400 Bad Request status
            if (!team.content) {
                return res.status(400).json({ message: "Invalid team id" });
            }

            // Check if the requesting user is the team owner
            if (team.content.owner !== req.session.user!.id) {
                return res.status(401).json({ message: "User not authorized" });
            }

            // Prepare updated team details
            const updatedTeam = {
                id: req.body.id, // Team ID
                name: req.body.name, // New team name from request body
                owner: req.session.user?.id! // Owner remains the session user
            };

            // Update the team in the database
            const response = dbManager.update({ table: DatabaseTables.TEAM, data: updatedTeam, column: "id", value: req.body.id });

            // Return the response with the status code and message
            res.status(response.code).json({ message: response.message });
        } else {
            // If the user is not authenticated, return a 401 Unauthorized status
            return res.status(401).json({ message: "User not authenticated" });
        }
    }
}

export default teamController;
