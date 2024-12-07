import { Request, Response } from "express";
import DatabaseManager, {
  DatabaseResponse,
  DatabaseTables,
} from "./databaseManager";
import databaseSingleton from "./databaseSingleton";
import { hashString } from "./hashUtils";
import sessionController from "./sessionController";
import validator from "validator";

if(process.argv.includes('verbose'))
  console.log("[INFO] Loading Task Controller...");

// Create a singleton instance of DatabaseManager to ensure a single point of database access
const dbManager: DatabaseManager = databaseSingleton();

export interface ITaskController {
  create(req: Request, res: Response): void;
  delete(req: Request, res: Response): void;
  update(req: Request, res: Response): void;
}

function findInvalidFields(obj: any) : Array<string>{

  let invalidField:Array<string> = []

  // Verifique se obj é um objeto e não está vazio
  if (
    typeof obj !== "object" ||
    obj === null ||
    Object.keys(obj).length === 0
  ) {
    invalidField.push("Empty Object");
  }

  // Verifique se todas as propriedades obrigatórias estão presentes
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



  // Verifique se creationDate é uma data válida
  if (!validator.isDate(obj.creationDate)) {
    invalidField.push("Creation Date")
  }

  // Verifique se deadline, se fornecida, é uma data válida
  if (obj.deadline && !validator.isDate(obj.deadline)) {
    invalidField.push("Deadline")
  }

  // Validação de tipo para prioridade e status
  if (!Number.isInteger(obj.priority) || obj.priority < 1) {
    invalidField.push("Priority")
  }

  if (!Number.isInteger(obj.status) || obj.status < 1) {
    invalidField.push("Status")
  }

  if (!Number.isInteger(obj.team) || obj.team < 1) {
    invalidField.push("Team")
  }

  if (!Number.isInteger(obj.responsible) || obj.responsible < 1) {
    invalidField.push("Responsible")
  }

  // Se todas as validações passarem, retorne true
  return invalidField;
}

const taskController: ITaskController = {
  create(req: Request, res: Response) {
    // Validate session
    if (sessionController.validSession(req)) {
      const newTask = req.body;
      const invalidFields = findInvalidFields(newTask)
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
      // If the user is not authenticated, return a 401 Unauthorized status
      return res.status(401).json({ message: "User not authenticated" });
    }
  },
  delete(req: Request, res: Response) {
    // Validate session
    if (sessionController.validSession(req)) {
        const taskID = req.body.id;
        const taskResponse = dbManager.select({table:DatabaseTables.TASK,column:"id",value:taskID})
        console.log(taskResponse)
    } else {
      // If the user is not authenticated, return a 401 Unauthorized status
      return res.status(401).json({ message: "User not authenticated" });
    }
  },
  update(req: Request, res: Response) {},
};

export default taskController;
