import { Request, Response } from "express";
import sessionController from "./sessionController";
import DatabaseManager, {
    DatabaseResponse,
    DatabaseTables,
    STATUS_CODE
} from "./databaseManager";
import databaseSingleton from "./databaseSingleton";

if(process.argv.includes('verbose'))
    console.log("[INFO] Loading Category Controller...");

/**
 * Interface for the Category Controller.
 */
export interface ICategoryController {
    /**
     * Creates a new category.
     * 
     * @param req - The HTTP request object, containing the category name in the body.
     * @param res - The HTTP response object used to send back the desired HTTP response.
     * 
     * @returns void - This method sends a JSON response and does not return a value.
     */
    create(req: Request, res: Response): void;
}

// Create a singleton instance of DatabaseManager
const dbManager: DatabaseManager = databaseSingleton();

/**
 * Category Controller implementation.
 */
const categoryController: ICategoryController = {
    create(req: Request, res: Response) {
        // Validate session
        if (sessionController.validSession(req)) {
            const newCategory = req.body.name;
            const categoryExist = dbManager.select({ table: DatabaseTables.CATEGORY, column: "name", value: newCategory });

            if (categoryExist.content) {
                // If the category already exists
                const content = { id: categoryExist.content.id, name: newCategory };
                return res.status(STATUS_CODE.CONFLICT).json({ message: "Category already exists.", content });
            }

            // Insert the new category into the database
            const newCategoryResponse = dbManager.insert({ table: DatabaseTables.CATEGORY, data: { name: newCategory } });
            const content = { id: newCategoryResponse.content.lastInsertRowid, name: newCategory };
            res.status(newCategoryResponse.code).json({ message: newCategoryResponse.message, content });
        } else {
            // User is not authenticated
            return res.status(401).json({ message: "User not authenticated" });
        }
    }
};

export default categoryController;
