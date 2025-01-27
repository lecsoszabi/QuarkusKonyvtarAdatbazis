CREATE TABLE book (
                      id SERIAL PRIMARY KEY,
                      title VARCHAR(100) NOT NULL,
                      author VARCHAR(100) NOT NULL,
                      quantity INT NOT NULL
);

CREATE TABLE user (
                      id SERIAL PRIMARY KEY,
                      name VARCHAR(50) NOT NULL,
                      address VARCHAR(100) NOT NULL
);

CREATE TABLE rental (
                        id SERIAL PRIMARY KEY,
                        book_id INT NOT NULL,
                        user_id INT NOT NULL,
                        quantity INT NOT NULL,
                        taken_out_at TIMESTAMP NOT NULL,
                        brought_back_at TIMESTAMP,
                        FOREIGN KEY (book_id) REFERENCES book(id),
                        FOREIGN KEY (user_id) REFERENCES user(id)
);
