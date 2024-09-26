import { Request, Response } from "express";
import { sessionController } from "./sessionController";
import DatabaseManager, {
    DatabaseResponse,
    DatabaseTables,
  } from "./databaseManager";
import databaseSingleton from "./databaseSingleton";

// Create a singleton instance of the DatabaseManager to ensure a single point of database access
const dbManager: DatabaseManager = databaseSingleton();

const teamController = {
    create(req: Request, res: Response) {
        if(sessionController.validSession(req)){
            const newTeam = {
                name: req.body.name,
                owner: req.body.owner || req.session.user?.id!
            }
            const newTeamResponse = dbManager.insert({table:DatabaseTables.TEAM,data:{name:`${newTeam.name} Team`, owner:newTeam.owner}})
            res.status(newTeamResponse.code).json({ message: newTeamResponse.message });
        } else {
            return res.status(401).json({ message: "User not authenticated" });
        }
    },

    delete(req: Request, res: Response) {

    },

    update(req: Request, res: Response) {

    }
}