import { Request, Response } from 'express';
import DatabaseManager, { DatabaseTables } from './databaseManager';
import databaseSingleton from './databaseSingleton';
import { hashString } from './hashUtils';

import 'express-session';

declare module 'express-session' {
    interface SessionData {
        user: { login: string };
    }
}

const dbManager: DatabaseManager = databaseSingleton();

// Middleware to check if the user is authenticated
function isAuthenticated(req: Request, res: Response, next: Function): void {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

const sessionController = {
    login(req: Request, res: Response){
        const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const {login, password} = req.body;
        const databaseResponse = dbManager.select({table:DatabaseTables.USER, column:"login", value:login})
        
        if(databaseResponse.content){
            const hashLoginPassword = hashString(password)
            if(databaseResponse.content.password === hashLoginPassword) {
            req.session.user = { login };
            res.json({ message: 'Login successful', user: req.session.user });
        }} else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    },
    logout(req: Request, res: Response){
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Logout failed' });
            }
            res.json({ message: 'Logout successful' });
        });
    },
    validSession(req: Request) : Boolean{
        if (req.session.user) {
            req.session.touch()
            return true
        } else {
            return false
        }
    }
}

export {sessionController}