INSERT INTO departments (name)
VALUES
  ('Management'),
  ('Development'),
  ('Sales'),
  ('Marketing');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('CEO', '150000', 1),
  ('Assistant', '55000', 1),
  ('Developer 1', '65000', 2),
  ('Developer 2', '85000', 2),
  ('Engeneer', '105000', 2),
  ('Sales Representative', '80000', 3),
  ('Marketing Strategist', '55000', 4),
  ('Analyst', '75000', 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Michael', 'Scott', 1, NULL),
  ('Pamela', 'Beesly', 2, 1),
  ('Jim', 'Halpert', 3, 1),
  ('Dwight', 'Schrute', 4, 3),
  ('Angela', 'Martin', 4, 3),
  ('Stanley', 'Hudson',  5, 3),
  ('Kevin', 'Malone',  5, 3),
  ('Andy', 'Bernard', 6, 1),
  ('Ryan', 'Howard', 8, 1),
  ('Creed', 'Bratton', 7, 3);