DROP DATABASE IF EXISTS LabWebProject;

CREATE TABLE Employees(
  e_id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(50) not null,
  phone varchar(20)
);

CREATE TABLE Menus(
  m_id int PRIMARY KEY AUTO_INCREMENT,
  label varchar(100) not null,
  description varchar(255)
);

CREATE TABLE Categories(
  c_id int PRIMARY KEY AUTO_INCREMENT,
  label varchar(100) not null
);

CREATE TABLE Dishes(
  d_id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(100) not null,
  description varchar(255) not null,
  c_id int not null,
  FOREIGN KEY(c_id) REFERENCES Categories(c_id)
);

CREATE TABLE Beverages(
  b_id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(100) not null,
  description varchar(255) not null
);

CREATE TABLE Tables(
  t_id int PRIMARY KEY AUTO_INCREMENT,
  seats int
);

CREATE TABLE MenuDish(
  md_id int PRIMARY KEY AUTO_INCREMENT,
  m_id int not null,
  d_id int,
  FOREIGN KEY(m_id) REFERENCES Menus(m_id),
  FOREIGN KEY(d_id) REFERENCES Dishes(d_id)
);

CREATE TABLE MenuBeverage(
  md_id int PRIMARY KEY AUTO_INCREMENT,
  m_id int not null,
  b_id int,
  FOREIGN KEY(m_id) REFERENCES Menus(m_id),
  FOREIGN KEY(b_id) REFERENCES Beverages(b_id)
);

-- Add Tables_Employees table
--


INSERT INTO Categories (label) VALUES ("Beverages");
