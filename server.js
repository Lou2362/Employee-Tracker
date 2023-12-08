const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res) => {
    res.status(404).end();
  });

const db = mysql.createConnection(
    {
      
      host: '',
      user: '',
      password: '',
      database: ''
    },
    console.log(`Connected to the employees_db database.`)
  );

console.log("Welcome to the Employee Tracker System!");

function run(){
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'selection',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Quit'
            ],
        }
    ).then(function (answer)
    {   
        switch (answer.selection) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Department':
                addDept();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmpRole();
                break;
            default:
                db.end();
                break;
    }
});
}

function viewDepartments()
{
    const sql = `SELECT * FROM DEPARTMENT`;
    
    db.query(sql, (err, rows) => {
        if (err) 
        {
            res.status(500).json({ error: err.message });
            return;
        }
            console.table(rows);
            run();
        });
}

function viewRoles()
{
    const sql = `SELECT * FROM ROLE`;

    db.query(sql, (err, rows) => {
        if (err) 
        {
            res.status(500).json({ error: err.message });
            return;
        }
            console.table(rows);
            run();
        });
}

function viewEmployees()
{
    const sql = `SELECT * FROM EMPLOYEE`;
        
    db.query(sql, (err, rows) => {
        if (err) 
        {
            res.status(500).json({ error: err.message });
            return;
        }
            console.table(rows);
            run();
        });
}

function addDept()
{
    inquirer.prompt([
            {
                name: 'dept_name',
                type: 'input',
                message: 'Enter the department name you want to add: '
            }
        ]).then((answer) => {

    const sql = `INSERT INTO department (dept_name) VALUES (?)`;
    const params = [answer.dept_name];
    
    db.query(sql, params, (err, result) => {
        if (err) 
        {
            throw err;
        }
        
    console.log('The new department has been added to the database.');
        
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) 
        {
            res.status(400).json({ error: err.message });
            return;
        }

        console.table(result);
        run();
        });
    });
    });
}


function addRole()
{
    inquirer.prompt([
            {
                name: 'role_name',
                type: 'input',
                message: 'Enter the role name you want to add: '
            },
            {
                name: 'salary',
                type: 'number',
                message: 'Enter the salary of the role you want to add (no commas): '
            },
            {
                name: 'department_id',
                type: 'number',
                message: 'Enter the department ID you want to add: '
            }
        ]).then(function (answer) {
    
    const sql = `INSERT INTO role (role_name, salary, department_id) VALUES (?, ?, ?)`;
    const params = [answer.role_name, answer.salary, answer.department_id];

    db.query(sql, params, function (err, result) {
        if (err) 
        {
            throw err;
        }

    console.log('The new role has been added to the database.');
        
    db.query(`SELECT * FROM role`, (err, result) => {
        if (err) 
        {
            res.status(400).json({ error: err.message });
            return;
        }

        console.table(result);
        run();
        });
    });
    });
}

function addEmployee()
{
    inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'Enter the first name of the employee you want to add: '
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Enter the last name of the employee you want to add: '
            },
            {
                name: 'role_id',
                type: 'number',
                message: 'Enter the role ID:',
            },
            {
                name: 'manager_id',
                type: 'number',
                message: 'Enter the manager ID:',
            }
        ]).then(function (answer) {

    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];

    db.query(sql, params, function (err, result) {
        if (err) 
        {
            throw err;
        }

    console.log('The new employee has been added to the database.');
        
    db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) 
        {
            res.status(400).json({ error: err.message });
            return;
        }

        console.table(result);
        run();
        });
    });
    });

}

function updateEmpRole()
{
    inquirer.prompt([
            {
                name: 'last_name',
                type: 'input',
                message: 'Enter the employee last name whose role you want to update: ',
            },
            {
                name: 'role_id',
                type: 'number',
                message: 'Enter the new role number for the employee: ',
            }
        ]).then(function (answer)  {

    const sql = `UPDATE employee SET role_id = ? WHERE last_name = ?`;
    const params = [answer.role_id, answer.last_name];

    db.query(sql, params, function (err, result) {
        if (err) 
        {
            throw err;
        }

    console.log('The employee role has been updated.');
        
    db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) 
        {
            res.status(400).json({ error: err.message });
        } 

        console.table(result);
        run();
        });
    });
    });
}
  
run();
// End of JS file