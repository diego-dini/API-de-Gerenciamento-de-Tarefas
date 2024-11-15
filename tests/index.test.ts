import request from 'supertest';
import express from 'express';
import session from 'express-session';
import sessionController from '../src/sessionController';
import userController from '../src/userController';
import teamController from '../src/teamController';
import categoryController from '../src/categoryController';
import taskController from '../src/taskController';

const app = express();
const port = 30000;

app.use(express.json());
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.post("/create/user", userController.create);
app.post("/update/user", userController.update);
app.post("/create/team", teamController.create);
app.post("/update/team", teamController.update);
app.post("/delete/team", teamController.delete);
app.post("/create/category", categoryController.create);
app.post("/create/task", taskController.create);
app.get("/login", sessionController.login);
app.get("/logout", sessionController.logout);

describe('User and Team Routes', () => {
    let sessionCookie: string | undefined; // Declare como string ou undefined

    it('should create a user', async () => {
        const user = {
            name: "Diego",
            email: "diego-diego@diego.diego",
            login: "diego",
            password: "4321"
        };

        const response = await request(app).post('/create/user').send(user);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Operation Succeeded');
    });

    it('should log in a user', async () => {
        const loginData = {
            login: "diego",
            password: "4321"
        };

        const response = await request(app).get('/login').send(loginData);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Login successful');
        expect(response.body.user).toHaveProperty('login', 'diego');

        // Captura o cookie da sessão
        sessionCookie = response.headers['set-cookie']?.[0]; // Pega o primeiro cookie

        // Verifique se o cookie foi capturado
        console.log('Session Cookie:', sessionCookie);
        expect(sessionCookie).toBeDefined(); // Certifique-se de que o cookie não é undefined
    });

    it('should create a team when logged in', async () => {
        expect(sessionCookie).toBeDefined(); // Verifique se o cookie está definido

        if (!sessionCookie) {
            throw new Error("Session cookie is undefined"); // Lança um erro se o cookie não estiver definido
        }

        const team = {
            name: "Teste"
        };

        const response = await request(app)
            .post('/create/team')
            .set('Cookie', sessionCookie) // Envia o cookie da sessão
            .send(team);
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Operation Succeeded');
    });

    it('should create a category when logged in', async () => {
        expect(sessionCookie).toBeDefined(); // Verifique se o cookie está definido

        if (!sessionCookie) {
            throw new Error("Session cookie is undefined"); // Lança um erro se o cookie não estiver definido
        }

        const category = {
            name: "Testeeeeeee"
        };

        const response = await request(app)
            .post('/create/category')
            .set('Cookie', sessionCookie) // Envia o cookie da sessão
            .send(category);
        
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Operation Succeeded');
    });
});

