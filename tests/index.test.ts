import databaseSingleton from '../src/databaseSingleton';
const db = databaseSingleton();

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

let sessionCookie: string | undefined;

describe('User Tests', () => {
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

    it('should not create a duplicate user', async () => {
        const user = {
            name: "Diego",
            email: "diego-diego@diego.diego",
            login: "diego",
            password: "4321"
        };

        const response = await request(app).post('/create/user').send(user);
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty('message', 'Login and Email are already registered.');
    });
});

describe('Session Tests', () => {
    it('should log in a user', async () => {
        const loginData = {
            login: "diego",
            password: "4321"
        };

        const response = await request(app).get('/login').send(loginData);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Login successful');
        expect(response.body.user).toHaveProperty('login', 'diego');

        sessionCookie = response.headers['set-cookie']?.[0];
        expect(sessionCookie).toBeDefined();
    });

    it('should fail to log in with incorrect credentials', async () => {
        const loginData = {
            login: "diego",
            password: "wrongpassword" // Credenciais incorretas
        };

        const response = await request(app).get('/login').send(loginData);
        expect(response.status).toBe(401); // Código de status esperado para falha de autenticação
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });
});


describe('Team Tests', () => {
    it('should create a team when logged in', async () => {
        expect(sessionCookie).toBeDefined();

        const team = {
            name: "Teste"
        };

        const response = await request(app)
            .post('/create/team')
            .set('Cookie', sessionCookie!)
            .send(team);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Operation Succeeded');
    });

    it('should fail to create a team when not logged in', async () => {
        const team = {
            name: "Teste"
        };

        const response = await request(app)
            .post('/create/team')
            .send(team); // Não define o cabeçalho `Cookie`

        expect(response.status).toBe(401); // Código de status esperado para não autorizado
        expect(response.body).toHaveProperty('message', 'User not authenticated');
    });
});


describe('Category Tests', () => {
    it('should create a category when logged in', async () => {
        expect(sessionCookie).toBeDefined();

        const category = {
            name: "Testeeeeeee"
        };

        const response = await request(app)
            .post('/create/category')
            .set('Cookie', sessionCookie!)
            .send(category);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Operation Succeeded');
    });

    it('should fail to create a category when not logged in', async () => {
        const category = {
            name: "Testeeeeeee"
        };

        const response = await request(app)
            .post('/create/category')
            .send(category); // Não define o cabeçalho `Cookie`

        expect(response.status).toBe(401); // Código de status esperado para não autorizado
        expect(response.body).toHaveProperty('message', 'User not authenticated');
    });
});

describe('Task Tests', () => {
    it('should create a task when logged in', async () => {
        expect(sessionCookie).toBeDefined();

        const timestamp = Date.now();
        const date = new Date(timestamp).toISOString();

        const task = {
            creationDate: date.split("T")[0],
            deadline: date.split("T")[0],
            name: "Teste",
            description:" Teste Teste",
            category: 1,
            priority: 1,
            status: 1,
            team: 1,
            responsible: 1
        };

        const response = await request(app)
            .post('/create/task')
            .set('Cookie', sessionCookie!)
            .send(task);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Operation Succeeded');
    });

    it('should fail to create a task when not logged in', async () => {
        const timestamp = Date.now();
        const date = new Date(timestamp).toISOString();

        const task = {
            creationDate: date.split("T")[0],
            deadline: date.split("T")[0],
            name: "Teste",
            description:" Teste Teste",
            category: 1,
            priority: 1,
            status: 1,
            team: 1,
            responsible: 1
        };

        const response = await request(app)
            .post('/create/task')
            .send(task); // Não define o cabeçalho `Cookie`

        expect(response.status).toBe(401); // Código de status esperado para não autorizado
        expect(response.body).toHaveProperty('message', 'User not authenticated');
    });
});

