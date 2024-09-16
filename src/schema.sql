-- schema.sql

CREATE TABLE IF NOT EXISTS task (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    creationDate DATE NOT NULL,
    deadline DATE,
    name TEXT NOT NULL,
    description TEXT,
    category INTEGER,
    priority INTEGER NOT NULL,
    status INTEGER NOT NULL,
    team INTEGER NOT NULL,
    responsible INTEGER NOT NULL,
    FOREIGN KEY (category) REFERENCES category(id),
    FOREIGN KEY (priority) REFERENCES priority(id),
    FOREIGN KEY (status) REFERENCES status(id),
    FOREIGN KEY (team) REFERENCES team(id),
    FOREIGN KEY (responsible) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    login TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS team (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    owner INTEGER NOT NULL,
    FOREIGN KEY (owner) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS team_members (
    team_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (team_id) REFERENCES team(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    PRIMARY KEY (team_id, user_id)
);

CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS priority (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);
