CREATE DATABASE IF NOT EXISTS reddit;

USE reddit;

CREATE TABLE IF NOT EXISTS users (
	user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(225),
    user_name VARCHAR(225) NOT NULL,
    pw VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS posts(
	post_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT,
    title text NOT NULL,
    timeUpdated int NOT NULL,
    url VARCHAR(225) NOT NULL,
    score INT DEFAULT 0,
    FOREIGN KEY (owner_id)
      REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS comments(
	comment_id INT PRIMARY KEY AUTO_INCREMENT,
    content text NOT NULL,
    owner_id INT,
    post_id INT,
    score INT DEFAULT 0,
    FOREIGN KEY (owner_id) 
    REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (post_id) 
    REFERENCES posts(post_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);