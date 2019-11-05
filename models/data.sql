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

show tables;

insert into users values 
(2, 'test_2', 'test_2@epam.com', '*****'),
(3, 'test_3', 'test_2@epam.com', '*****'),
(4, 'test_4', 'test_2@epam.com', '*****'),
(5, 'test_5', 'test_2@epam.com', '*****'),
(6, 'test_6', 'test_2@epam.com', '*****'),
(7, 'test_7', 'test_2@epam.com', '*****');

insert into posts values
(1, 1, 'post 1', 100, 'https://exploringjs.com/impatient-js/toc.html', 0),
(2, 1, 'post 2', 100, 'https://exploringjs.com/impatient-js/toc.html', 0),
(3, 1, 'post 3', 100, 'https://exploringjs.com/impatient-js/toc.html', 0),
(4, 3, 'post 4', 100, 'https://exploringjs.com/impatient-js/toc.html', 0),
(5, 4, 'post 5', 100, 'https://exploringjs.com/impatient-js/toc.html', 0),
(6, 2, 'post 6', 100, 'https://exploringjs.com/impatient-js/toc.html', 0),
(7, 5, 'post 7', 100, 'https://exploringjs.com/impatient-js/toc.html', 0),
(8, 7, 'post 8', 100, 'https://exploringjs.com/impatient-js/toc.html', 0),
(9, 6, 'post 9', 100, 'https://exploringjs.com/impatient-js/toc.html', 0),
(10, 6, 'post 10', 100, 'https://exploringjs.com/impatient-js/toc.html', 0),
(11, 5, 'post 11', 100, 'https://exploringjs.com/impatient-js/toc.html', 0),
(12, 3, 'post 12', 100, 'https://exploringjs.com/impatient-js/toc.html', 0),
(13, 4, 'post 13', 100, 'https://exploringjs.com/impatient-js/toc.html', 0),
(14, 2, 'post 14', 100, 'https://exploringjs.com/impatient-js/toc.html', 0),
(15, 5, 'post 15', 100, 'https://exploringjs.com/impatient-js/toc.html', 0),
(16, 7, 'post 16', 100, 'https://exploringjs.com/impatient-js/toc.html', 0),
(17, 7, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ', 100, 'https://exploringjs.com/impatient-js/toc.html', 0)
;
INSERT INTO posts(owner_id, title, timeUpdated, url) values
(7, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ', 100, 'https://exploringjs.com/impatient-js/toc.html')
;