import databaseSingleton from '../src/databaseSingleton';
const db = databaseSingleton(':memory:');

import request from 'supertest';
import app from '../src/app'

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
        it('should update a task when logged in', async () => {
            expect(sessionCookie).toBeDefined();
    
            const timestamp = Date.now();
            const date = new Date(timestamp).toISOString();
    
            const task = {
                id: 1,
                creationDate: date.split("T")[0],
                deadline: date.split("T")[0],
                name: "Teste 2",
                description:" Teste2  Teste2",
                category: 1,
                priority: 1,
                status: 1,
                team: 1,
                responsible: 1
            };
    
            const response = await request(app)
                .post('/update/task')
                .set('Cookie', sessionCookie!)
                .send(task);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('message', 'Operation Succeeded');
        
        });
});

// Test suite for team invite-related functionalities
describe('Team Invite Tests', () => {



    it('should create a valid team invite', async () => {
        expect(sessionCookie).toBeDefined(); // Ensure user is logged in


        const user = {
            name: "Diego2",
            email: "diego2-diego@diego.diego",
            login: "diego2",
            password: "4321"
        };

        await request(app).post('/create/user').send(user);


        const teamInvite = {
            teamId:1,
            creatorId: 2, // ID of the user creating the invite
            invitedId: 1,       // ID of the invited user
            creationDate: new Date().toISOString(), // Current date and time
        };

        const response = await request(app)
            .post('/create/team-invite')
            .set('Cookie', sessionCookie!) // Include session cookie
            .send(teamInvite);
        expect(response.status).toBe(201); // Expect successful creation
        expect(response.body).toHaveProperty('message', 'Operation Succeeded');
    });

    it('should fail to create a team invite with missing fields', async () => {
        expect(sessionCookie).toBeDefined(); // Ensure user is logged in

        const incompleteInvite = {
            invitedId: 2, // Missing inviteCreatorId and other required fields
        };

        const response = await request(app)
            .post('/create/team-invite')
            .set('Cookie', sessionCookie!) // Include session cookie
            .send(incompleteInvite);

        expect(response.status).toBe(400); // Expect bad request due to validation error
        expect(response.body).toHaveProperty('message', 'Invalid data provided');
    });

    
});

