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

CREATE TABLE IF NOT EXISTS team_invites ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_id INTEGER NOT NULL,
    invite_creator_id INTEGER NOT NULL,
    invited_id INTEGER NOT NULL,
    creation_date DATE NOT NULL,
    valid BOOLEAN NOT NULL,
    FOREIGN KEY (team_id) REFERENCES team(id),
    FOREIGN KEY (invite_creator_id) REFERENCES user(id),
    FOREIGN KEY (invited_id) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS priority (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);


INSERT OR IGNORE INTO priority (name) VALUES ('low');
INSERT OR IGNORE INTO priority (name) VALUES ('medium');
INSERT OR IGNORE INTO priority (name) VALUES ('high');


INSERT OR IGNORE INTO status (name) VALUES ('0%');
INSERT OR IGNORE INTO status (name) VALUES ('25%');
INSERT OR IGNORE INTO status (name) VALUES ('50%');
INSERT OR IGNORE INTO status (name) VALUES ('75%');
INSERT OR IGNORE INTO status (name) VALUES ('100%');