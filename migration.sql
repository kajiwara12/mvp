DROP TABLE IF EXISTS thing;
DROP TABLE IF EXISTS player;
DROP TABLE IF EXISTS score;

CREATE TABLE player (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE score (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES player (id),
    score INTEGER
);
