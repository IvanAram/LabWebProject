USE LabWebProject;

INSERT INTO Waiters(name) VALUES
("Ivan"),
("Jose"),
("Aram"),
("Manuel");

INSERT INTO Menus(label, description) VALUES
("Food", "This menu contains all the dishes available."),
("Beverages", "This menu contains all the Beverages available"),
("Kids", "This is a special menu for kids");

INSERT INTO Categories(label) VALUES
("Salads"),
("Pastas"),
("Pizzas"),
("Deserts");

INSERT INTO Dishes(name, description, c_id) VALUES
("Caesar salad", "Delicious salad prepared caesar style", 3),
("Spicy Carrot Salad", "Crisp-tender microwaved grated carrots and minced garlic with lemon juice, olive oil, salt, red pepper flakes and parsley.", 3),
("Fusilli di queso", "Pasta with helical shape in cheese sauce", 4),
("Ravioli di quattro formaggi","Pasta stuffed with 4 types of cheese and covered with cheese sauce", 4),
("Peperoni pizza", "No explanation needed", 5),
("Mushrooms pizza", "No explanation needed", 5),
("Cheese pizza", "No explanation needed", 5),
("Chocolate cake", "Awsome chocolate cake with more chocolate inside!", 6);

INSERT INTO Beverages(name, description, alcoholic) VALUES
("Coca-cola","Regular cola-flavoured soda", 0),
("Diet coca-cola","Diet cola-flavoured soda", 0),
("Coca-cola zero","Zero cola-flavoured soda", 0),
("Beer","Dark beer", 1),
("Whiskey","Whiskey with mineral water and optionally soda", 1);

INSERT INTO Tables(seats) VALUES
(2),(2),(2),
(4),(4),(4),(4),(4),
(6),(6);

INSERT INTO MenuDish(m_id, d_id) VALUES
(1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),
(3,4),(3,5),(3,8);

INSERT INTO MenuBeverage(m_id, b_id) VALUES
(2,1),(2,2),(2,3),(2,4),(2,5),
(3,1),(3,2),(3,3);
