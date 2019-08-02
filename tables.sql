CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    Name TEXT,
    Start_Date TEXT,
    Location TEXT,
    URL TEXT,
    Description TEXT
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT
);