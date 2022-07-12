const mysql = require('mysql2');
const inquirer = require('inquirer');

// // Imports the objects from the lib folder
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password01!',
        database: 'employeeTracker'
    },
    console.log('Connected to the employee tracker database.')
);

function nextAction() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'next',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    ])
        .then(({ next }) => {
            switch (next) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    let newDepartment = new Department();
                    addDept(newDepartment);
                    break;
                case 'Add a role':
                    let newRole = new Role();
                    addRole(newRole);
                    break;
                case 'Add an employee':
                    let newEmployee = new Employee();
                    addEmployee(newEmployee);
                    break;
                case 'Update an employee role':
                    Employee.update();
                    break;
            }
        });
};


function viewAllDepartments() {
    db.promise().query('SELECT * FROM departments')
        .then(([response]) => {
            console.clear();
            console.log("The database contains the following departments:")
            console.table(response);
            console.log('\n');
            nextAction();
        })
};

function viewAllRoles() {
    db.promise().query(
        `SELECT roles.id, roles.title, departments.name AS department, roles.salary 
        FROM roles 
        LEFT JOIN departments ON roles.department_id=departments.id; 
        `)
        .then(([response]) => {
            console.clear();
            console.log("The database contains the following roles:")
            console.table(response);
            console.log('\n');
            nextAction();
        })   
};

function viewAllEmployees() {
    db.promise().query(
        `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS role, employees.manager_id 
        FROM employees 
        LEFT JOIN roles ON employees.role_id=roles.id; 
        `)
        .then(([response]) => {
            console.clear();
            console.log("The database contains the following employees:")
            console.table(response);
            console.log('\n');
            nextAction();
        })
};

console.clear();
nextAction();