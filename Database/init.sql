CREATE DATABASE IF NOT EXISTS users;
USE users;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(24) NOT NULL,
    password CHAR(60) NOT NULL,
    auth_token CHAR(128),
    best_run INT
);

CREATE DATABASE IF NOT EXISTS scores;
USE scores;

CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    game_word_memory INT NOT NULL,
    game_number_memory INT NOT NULL,
    game_sequence_memory INT NOT NULL,
    game_chimp_test INT NOT NULL,
    game_reaction_time INT NOT NULL,
    date DATE,
    score INT NOT NULL
);