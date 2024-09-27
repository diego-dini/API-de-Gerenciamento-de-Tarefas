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
            const newTeamResponse = dbManager.insert({table:DatabaseTables.TEAM,data:newTeam})
            dbManager.addTeamMember(newTeamResponse.content.lastInsertRowid,newTeam.owner)
            res.status(newTeamResponse.code).json({ message: newTeamResponse.message, content:newTeamResponse.content});
        } else {
            return res.status(401).json({ message: "User not authenticated" });
        }
    },

    delete(req: Request, res: Response) {
        if(sessionController.validSession(req)){
            const teamId = req.body.id
            const team = dbManager.select({table:DatabaseTables.TEAM, column:'id', value:teamId})
            if(!team.content) {
                return res.status(400).json({ message: "Invalid team id" });
            }
            if (team.content.owner != req.session.user!.id){
                return res.status(401).json({ message: "User not autorized" });
            }
            dbManager.removeAllTeamMembers(teamId)
            const databaseResponse = dbManager.delete({table:DatabaseTables.TEAM, column:'id', value:teamId})
            res.status(databaseResponse.code).json({ message: databaseResponse.message });
        }else {
            return res.status(401).json({ message: "User not authenticated" });
        }
    },

    update(req: Request, res: Response) {
        if(sessionController.validSession(req)){

            const teamId = req.body.id
            const team = dbManager.select({table:DatabaseTables.TEAM, column:'id', value:teamId})
            if(!team.content) {
                return res.status(400).json({ message: "Invalid team id" });
            }
            if (team.content.owner != req.session.user!.id){
                return res.status(401).json({ message: "User not autorized" });
            }

            const newTeam = {
                id: req.body.id,
                name: req.body.name,
                owner: req.session.user?.id!
            }
            const response = dbManager.update({table:DatabaseTables.TEAM,data:newTeam, column:"id", value:req.body.id})           
            res.status(response.code).json({ message: response.message });
        } else {
            return res.status(401).json({ message: "User not authenticated" });
        }
    }
}

export default teamController