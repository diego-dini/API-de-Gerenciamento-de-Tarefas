import { Request, Response } from "express";
import DatabaseManager, {
  DatabaseResponse,
  DatabaseTables,
} from "./databaseManager";
import databaseSingleton from "./databaseSingleton";
import { hashString } from "./hashUtils";
import sessionController from "./sessionController";
import validator from "validator";

if (process.argv.includes("verbose"))
  console.log("[INFO] Loading Task Controller...");

// Create a singleton instance of DatabaseManager to ensure a single point of database access
const dbManager: DatabaseManager = databaseSingleton();

export interface ITaskController {
  create(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
  get(req: Request, res: Response): void;
}

function findInvalidFields(obj: any): Array<string> {
  let invalidField: Array<string> = [];

  if (
    typeof obj !== "object" ||
    obj === null ||
    Object.keys(obj).length === 0
  ) {
    invalidField.push("Empty Object");
  }

  const requiredFields = [
    "creationDate",
    "deadline",
    "name",
    "priority",
    "status",
    "team",
    "responsible",
  ];
  for (const field of requiredFields) {
    if (obj[field] === undefined || obj[field] === null) {
      invalidField.push(field);
    }
  }

  if (!validator.isDate(obj.creationDate)) {
    invalidField.push("Creation Date");
  }

  if (obj.deadline && !validator.isDate(obj.deadline)) {
    invalidField.push("Deadline");
  }

  if (!Number.isInteger(obj.priority) || obj.priority < 1) {
    invalidField.push("Priority");
  }

  if (!Number.isInteger(obj.status) || obj.status < 1) {
    invalidField.push("Status");
  }

  if (!Number.isInteger(obj.team) || obj.team < 1) {
    invalidField.push("Team");
  }

  if (!Number.isInteger(obj.responsible) || obj.responsible < 1) {
    invalidField.push("Responsible");
  }

  return invalidField;
}

const taskController: ITaskController = {
  create(req: Request, res: Response) {
    if (sessionController.validSession(req)) {
      const newTask = req.body;
      const invalidFields = findInvalidFields(newTask);
      if (invalidFields.length > 0)
        return res.status(400).json({ message: "Invalid Task " + invalidFields.toString() });

      const newTaskResponse = dbManager.insert({
        table: DatabaseTables.TASK,
        data: newTask,
      });
      res
        .status(newTaskResponse.code)
        .json({
          message: newTaskResponse.message,
          content: newTaskResponse.content,
        });
    } else {
      return res.status(401).json({ message: "User not authenticated" });
    }
  },

  delete(req: Request, res: Response) {
    if (sessionController.validSession(req)) {

      const resquetParams = {
        table: DatabaseTables.TASK,
        column: "id",
        value: req.body.id,
      }

      const taskResponse = dbManager.select(resquetParams)

      if (taskResponse.content!.owner !== req.session.user!.id && taskResponse.content.responsible !== req.session.user!.id) {
        return res.status(401).json({ message: "User not authorized" });
      }
      const deleteResponse = dbManager.delete(resquetParams)

    } else {
      return res.status(401).json({ message: "User not authenticated" });
    }
  },

  update(req: Request, res: Response) {
    if (sessionController.validSession(req)) {
      const taskId = req.body.id;
      const updatedData = req.body;

      if (!taskId) {
        return res.status(400).json({ message: "Task ID is required" });
      }

      const invalidFields = findInvalidFields(updatedData);
      if (invalidFields.length > 0) {
        return res.status(400).json({
          message: "Invalid Task Data: " + invalidFields.join(", "),
        });
      }

      const taskExists = dbManager.select({
        table: DatabaseTables.TASK,
        column: "id",
        value: taskId,
      });

      if (!taskExists.content) {
        return res.status(404).json({ message: "Task not found" });
      }

      if (taskExists.content.owner !== req.session.user!.id && taskExists.content.responsible !== req.session.user!.id) {
        return res.status(401).json({ message: "User not authorized" });
      }

      const updateResponse = dbManager.update({
        table: DatabaseTables.TASK,
        column: "id",
        data: updatedData,
        value: taskId,
      });

      res.status(updateResponse.code).json({
        message: updateResponse.message,
        content: updateResponse.content,
      });
    } else {
      return res.status(401).json({ message: "User not authenticated" });
    }
  },

get(req, res) {
  if (sessionController.validSession(req)) {
    const taskId = req.body.id;
    const updatedData = req.body;

    const taskExists = dbManager.select({
      table: DatabaseTables.TASK,
      column: "id",
      value:  req.session.user!.id.toString(),
    });

    if (!taskExists.content) {
      return res.status(404).json({ message: "Task not found" });
    }

    const getResponse = dbManager.update({
      table: DatabaseTables.TASK,
      column: "responsible",
      value: taskId,
    });

    res.status(getResponse.code).json({
      message: getResponse.message,
      content: getResponse.content,
    });
  } else {
    return res.status(401).json({ message: "User not authenticated" });
  }
},
};

export default taskController;
