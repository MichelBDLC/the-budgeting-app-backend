DROP DATABASE IF EXISTS transactions_dev;

CREATE DATABASE transactions_dev;

\c transactions_dev;

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    name TEXT,
    amount INT,
    date TEXT,
    origin TEXT,
    category TEXT
)