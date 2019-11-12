CREATE DATABASE IF NOT EXISTS reddit;
USE reddit;

CREATE TABLE IF NOT EXISTS users (
	userName VARCHAR(225) PRIMARY KEY,
  email VARCHAR(225),
  pw VARCHAR(20) NOT NULL
);

insert into users values 
('Hao', 'Hao@epam.com', '123'),
('Adam', 'Adam@epam.com', '123'),
('Martin', 'Martin@epam.com', '123'),
('Jeff', 'Jeff@epam.com', '123'),
('Cola', 'Cola@epam.com', '123'),
('Garrin', 'Garrin@epam.com', '123'),
('Jun', 'Jun@epam.com', '123'),
('Honda', 'Honda@epam.com', '123'),
('Mate', 'Mate@epam.com', '123'),
('Ben', 'Ben@epam.com', '123'),
('Cathy', 'Cathy@epam.com', '123'),
('Yuan', 'Yuan@epam.com', '123'),
('Arthur', 'Arthur@epam.com', '123'),
('Earvin', 'Earvin@epam.com', '123');

CREATE TABLE IF NOT EXISTS posts(
	postId INT PRIMARY KEY AUTO_INCREMENT,
  ownerName VARCHAR(225) NOT NULL,
  title text NOT NULL,
  created int NOT NULL,
  lastUpdated int NOT NULL,
  postUrl VARCHAR(225) NOT NULL,
  score INT DEFAULT 0,
  FOREIGN KEY (ownerName)
	REFERENCES users(userName)
		ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO posts(ownerName, title, created, lastUpdated, postUrl) 
VALUES
('Hao', 'Hi I am Hao', 100000, 100000, 'https://google.com/'),
('Adam', 'Hi I am Adam', 100000, 100000, 'https://google.com/'),
('Martin', 'Hi I am Martin', 100000, 100000, 'https://google.com/'),
('Jeff', 'Hi I am Jeff', 100000, 100000, 'https://google.com/'),
('Cola', 'Hi I am Cola', 100000, 100000, 'https://google.com/'),
('Garrin', 'Hi I am Garrin', 100000, 100000, 'https://google.com/'),
('Jun', 'Hi I am Jun', 100000, 100000, 'https://google.com/'),
('Honda', 'Hi I am Honda', 100000, 100000, 'https://google.com/'),
('Mate', 'Hi I am Mate', 100000, 100000, 'https://google.com/'),
('Ben', 'Hi I am Ben', 100000, 100000, 'https://google.com/'),
('Cathy', 'Hi I am Cathy', 100000, 100000, 'https://google.com/'),
('Arthur', 'Hi I am Arthur', 100000, 100000, 'https://google.com/'),
('Yuan', 'Hi I am Yuan', 100000, 100000, 'https://google.com/'),
('Earvin', 'Hi I am Earvin', 100000, 100000, 'https://google.com/');

CREATE TABLE IF NOT EXISTS comments(
	commentId INT PRIMARY KEY AUTO_INCREMENT,
  content text NOT NULL,
  ownerName VARCHAR(225) NOT NULL,
  postId INT,
  score INT DEFAULT 0,
  FOREIGN KEY (ownerName) 
  REFERENCES users(userName)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (postId) 
  REFERENCES posts(postId)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO comments(content, ownerName, postId)
values 
('comment 1', "Hao", 10),
('comment 2', "Cola", 12),
('comment 3', "Jeff", 14),
('comment 4', "Adam", 14),
('comment 5', "Ben", 14),
('comment 6', "Jeff", 14),
('comment 7', "Martin", 14),
('comment 8', "Hao", 14),
('comment 9', "Hao", 14);

SHOW TABLES;