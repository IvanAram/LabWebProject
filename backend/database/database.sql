DROP DATABASE IF EXISTS LabWebProject;
CREATE DATABASE LabWebProject;
USE LabWebProject;

CREATE TABLE Login(
  u_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(50) NOT NULL
);

CREATE TABLE Waiters(
  w_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE Menus(
  m_id INT PRIMARY KEY AUTO_INCREMENT,
  label VARCHAR(100) NOT NULL,
  description VARCHAR(255)
);

CREATE TABLE Categories(
  c_id INT PRIMARY KEY AUTO_INCREMENT,
  label VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Dishes(
  d_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL,
  c_id INT NOT NULL,
  FOREIGN KEY(c_id) REFERENCES Categories(c_id)
);

CREATE TABLE Beverages(
  b_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL,
  alcoholic TINYINT(1) DEFAULT 0
);

CREATE TABLE Tables(
  t_id INT PRIMARY KEY AUTO_INCREMENT,
  seats INT
);

CREATE TABLE MenuDish(
  md_id INT PRIMARY KEY AUTO_INCREMENT,
  m_id INT NOT NULL,
  d_id INT,
  FOREIGN KEY(m_id) REFERENCES Menus(m_id),
  FOREIGN KEY(d_id) REFERENCES Dishes(d_id)
);

CREATE TABLE MenuBeverage(
  md_id INT PRIMARY KEY AUTO_INCREMENT,
  m_id INT NOT NULL,
  b_id INT,
  FOREIGN KEY(m_id) REFERENCES Menus(m_id),
  FOREIGN KEY(b_id) REFERENCES Beverages(b_id)
);

-- ADD WAITERS - EMPLOYEES TABLE

INSERT INTO Categories (label) VALUES ("Beverages"), ("Other");
-- Beverages = 1, Other = 2

INSERT INTO Login (username, email, password) VALUES ("admin","ivan.ags.95@gmail.com","admin");
INSERT INTO Login (username, email, password) VALUES ("peps","peps@peps.com","peps");
