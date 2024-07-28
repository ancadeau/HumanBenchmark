# CREATE DATABASE IF NOT EXISTS human_benchmark;
# USE human_benchmark;

USE Group3;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(24) NOT NULL,
    password CHAR(60) NOT NULL,
    dob DATE NOT NULL,
    best_run INT
);

CREATE TABLE IF NOT EXISTS scores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    game_word_memory INT NOT NULL,
    game_number_memory INT NOT NULL,
    game_sequence_memory INT NOT NULL,
    game_chimp_test INT NOT NULL,
    game_reaction_time INT NOT NULL,
    date DATETIME NOT NULL ,
    score INT NOT NULL
);

# CREATE USER 'human'@'%' IDENTIFIED BY 'the_cake_is_a_lie';
# GRANT ALL PRIVILEGES ON human_benchmark.* TO 'human'@'%';
