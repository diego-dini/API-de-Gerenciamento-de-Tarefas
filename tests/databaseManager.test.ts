import DatabaseManager, { DatabaseTables, Team, User } from '../src/databaseManager';

describe('DatabaseManager - User Operations', () => {
  let dbManager: DatabaseManager;

  // Configuração antes dos testes (inicializa o banco de dados)
  beforeAll(() => {
    dbManager = new DatabaseManager(':memory:');
  });

  // Função para inicializar o esquema do banco de dados

  test('Inserir usuário no banco de dados', () => {
    const userData: User = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      password: 'securepassword123',
    };

    const response = dbManager.insert({
      table: DatabaseTables.USER,
      data: userData,
    });

    expect(response.code).toBe(201);
    expect(response.message).toBe('Operation Succeeded');
  });

  test('Inserir usuário repetido no banco de dados', () => {
    const userData: User = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
      password: 'securepassword123',
    };

    const response = dbManager.insert({
      table: DatabaseTables.USER,
      data: userData,
    });

    expect(response.code).toBe(400);
    expect(response.message).toBe('Bad Request');
  })

  test('Selecionar usuário por login', () => {
    const response = dbManager.select({
      table: DatabaseTables.USER,
      column: 'login',
      value: 'johndoe',
    });

    expect(response.code).toBe(200);
    expect(response.content).toMatchObject({
      name: 'John Doe',
      email: 'johndoe@example.com',
      login: 'johndoe',
    });
  });

  test('Selecionar usuário por login invalido', () => {
    const response = dbManager.select({
      table: DatabaseTables.USER,
      column: 'login',
      value: 'Jhon',
    });

    expect(response.code).toBe(200);
    expect(response.content).toBe(undefined);
  })

  test('Atualizar dados de um usuário', () => {
    const updatedUserData: User = {
      id: 1,
      name: 'John Updated',
      email: 'johnupdated@example.com',
      login: 'johndoe',
      password: 'newpassword123',
    };

    const response = dbManager.update({
      table: DatabaseTables.USER,
      column: 'login',
      value: 'johndoe',
      data: updatedUserData,
    });

    expect(response.code).toBe(200);
    expect(response.message).toBe('Operation Succeeded');
  });

  test('Atualizar dados de um usuário invalido', () => {
    const updatedUserData: User = {
      id: 2,
      name: 'John Updated',
      email: 'johnupdated@example.com',
      login: 'johndoe',
      password: 'newpassword123',
    };

    const response = dbManager.update({
      table: DatabaseTables.USER,
      column: 'login',
      value: 'Jhon',
      data: updatedUserData,
    });
    expect(response.code).toBe(200);
    expect(response.content.changes).toBe(0);
  });

  test('Deletar usuário do banco de dados', () => {
    const response = dbManager.delete({
      table: DatabaseTables.USER,
      column: 'login',
      value: 'johndoe',
    });
    
    expect(response.code).toBe(200);
    expect(response.message).toBe('Operation Succeeded');
  });

  
});
