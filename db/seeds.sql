INSERT INTO department (dept_name)
VALUES ("Development"),
       ("Accounting"),
       ("Human Resources");

INSERT INTO role (role_name, salary, department_id)
VALUES ("Software Dev", 90000, 1),
       ("Budget Accounting", 110000, 2),
       ("Market Accounting", 80000, 2),
       ("Software Lead", 140000, 1),
       ("HR Specialist", 65000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Will", "Smith", 1, null),
       ("George", "Lucas", 2, 1),
       ("Lucille", "Ball", 3, 2),
       ("John", "Doe", 1, 1),
       ("Jasmin", "Hernandez", 2, null);