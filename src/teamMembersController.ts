import { Request, Response } from "express";
import sessionController from "./sessionController";
import DatabaseManager, { DatabaseTables, TeamInvite } from "./databaseManager";
import databaseSingleton from "./databaseSingleton";
import teamController from "./teamController";

// Check if verbose mode is enabled and log a message when loading the Team Controller
if (process.argv.includes("verbose"))
  console.log("[INFO] Loading Team Controller...");

// Create a singleton instance of DatabaseManager to ensure a single point of access to the database
const dbManager: DatabaseManager = databaseSingleton();

/**
 * Interface to define team members management operations.
 */
export interface ITeamMembersController {
  invite(req: Request, res: Response): void;
  remove(req: Request, res: Response): void;
  accept(req: Request, res: Response): void;
  refuse(req: Request, res: Response): void;
}

/**
 * Implementation of the controller for managing team members.
 */
const TeamMembersController: ITeamMembersController = {
  /**
   * Method to invite another user to join a team.
   */
  invite(req: Request, res: Response) {
    if (sessionController.validSession(req)) {
      const teamId = req.body.teamId; // Team ID sent in the request body

      // Fetch the team from the database
      const team = dbManager.select({
        table: DatabaseTables.TEAM,
        column: "id",
        value: teamId,
      });

      // Return error if the team does not exist
      if (!team.content) {
        return res.status(400).json({ message: "Invalid data provided" });
      }

      // Check if the requesting user is the owner of the team
      if (team.content.owner !== req.session.user!.id) {
        return res.status(401).json({ message: "User not authorized" });
      }

      // Create a new team invite
      const data: TeamInvite = {
        teamId: req.body.teamId,
        creatorId: req.session.user!.id,
        invitedId: req.body.invitedId,
        creationDate: new Date(Date.now()).toISOString().split("T")[0],
        valid: 1, // Invite is valid initially
      };

      // Insert the invite into the database
      const inviteResponse = dbManager.insert({
        table: DatabaseTables.TEAM_INVITES,
        data,
      });

      // Return the response based on the result of the insert operation
      res
        .status(inviteResponse.code)
        .json({
          message: inviteResponse.message,
          content: inviteResponse.content,
        });
    } else {
      // Return error if the user is not authenticated
      return res.status(401).json({ message: "User not authenticated" });
    }
  },

  /**
   * Method to remove a member from a team.
   */
  remove(req: Request, res: Response) {
    if (sessionController.validSession(req)) {
      const teamId = req.body.teamId; // Team ID sent in the request body

      // Fetch the team from the database
      const team = dbManager.select({
        table: DatabaseTables.TEAM,
        column: "id",
        value: teamId,
      });

      // Return error if the team does not exist
      if (!team.content) {
        return res.status(400).json({ message: "Invalid data provided" });
      }

      // Check if the requesting user is the owner of the team
      if (team.content.owner !== req.session.user!.id) {
        return res.status(401).json({ message: "User not authorized" });
      }

      // Remove the member from the team
      const requestResponse = dbManager.removeTeamMember(
        req.body.teamId,
        req.body.userId
      );

      // Return the response based on the result of the removal operation
      res
        .status(requestResponse.code)
        .json({
          message: requestResponse.message,
          content: requestResponse.content,
        });
    } else {
      // Return error if the user is not authenticated
      return res.status(401).json({ message: "User not authenticated" });
    }
  },

  /**
   * Method to accept a team invitation.
   */
  accept(req: Request, res: Response) {
    if (sessionController.validSession(req)) {
      const inviteId = req.body.inviteId; // Invite ID sent in the request body

      // Fetch the invitation from the database
      const invite = dbManager.select({
        table: DatabaseTables.TEAM_INVITES,
        column: "id",
        value: inviteId,
      });

      // Return error if the invitation does not exist
      if (!invite.content) {
        return res.status(400).json({ message: "Invalid Invite ID" });
      }

      // Check if the requesting user is the invite recipient
      if (invite.content.invitedId !== req.session.user!.id) {
        return res.status(401).json({ message: "User not authorized" });
      }

      // Check if the invite is already inactive
      if (invite.content.valid === 0) {
        return res.status(401).json({ message: "Inactive Invite" });
      }

      // Update the invite status to inactive
      const newInviteStatus = invite.content;
      newInviteStatus.valid = 0;

      const inviteResponse = dbManager.update({
        table: DatabaseTables.TEAM_INVITES,
        column: "id", // Column used to match the update
        data: newInviteStatus,
        value: inviteId,
      });

      // Add the user to the team
      const requestResponse = dbManager.addTeamMember(
        invite.content.teamId,
        invite.content.invitedId
      );

      // Return the response based on the result of the operation
      res
        .status(requestResponse.code)
        .json({
          message: requestResponse.message,
          content: requestResponse.content,
        });
    } else {
      // Return error if the user is not authenticated
      return res.status(401).json({ message: "User not authenticated" });
    }
  },

  /**
   * Method to decline a team invitation.
   */
  refuse(req: Request, res: Response) {
    if (sessionController.validSession(req)) {
      const inviteId = req.body.inviteId; // Invite ID sent in the request body

      // Fetch the invitation from the database
      const invite = dbManager.select({
        table: DatabaseTables.TEAM_INVITES,
        column: "id",
        value: inviteId,
      });

      // Return error if the invitation does not exist
      if (!invite.content) {
        return res.status(400).json({ message: "Invalid Invite ID" });
      }

      // Check if the requesting user is the invite recipient
      if (invite.content.invitedId !== req.session.user!.id) {
        return res.status(401).json({ message: "User not authorized" });
      }

      // Check if the invite is already inactive
      if (invite.content.valid === 0) {
        return res.status(401).json({ message: "Inactive Invite" });
      }

      // Update the invite status to inactive
      const newInviteStatus = invite.content;
      newInviteStatus.valid = 0;

      const requestResponse = dbManager.update({
        table: DatabaseTables.TEAM_INVITES,
        column: "id", // Column used to match the update
        data: newInviteStatus,
        value: inviteId,
      });

      // Return the response based on the result of the operation
      res
        .status(requestResponse.code)
        .json({
          message: requestResponse.message,
          content: requestResponse.content,
        });
    } else {
      // Return error if the user is not authenticated
      return res.status(401).json({ message: "User not authenticated" });
    }
  },
};

export default TeamMembersController;
