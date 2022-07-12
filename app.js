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
                    inquireDept();
                    break;
                case 'Add a role':
                    inquireRole();
                    break;
                case 'Add an employee':
                    inquireEmployee();
                    break;
                case 'Update an employee role':
                    inquireUpdate();
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

function inquireDept() {
    console.clear();
    console.log("Let's add a new department to the database. Please answer the question bellow.");

    inquirer.prompt([{
        type: 'input',
        name: 'deptName',
        message: 'What is the name of this department?'
    }
    ]).then(({ deptName }) => {
        let newDepartment = new Department(deptName);
        console.log(newDepartment);

        addDept(newDepartment);
    })
};

function addDept(newDepartment) {
    db.promise().query('INSERT INTO departments SET ?', newDepartment)
    nextAction();
};

function inquireRole() {
    console.clear();
    console.log("Let's add a new role to the database. Please answer a few questions.");

    inquirer.prompt([{
        type: 'input',
        name: 'title',
        message: 'What is the title of this role?'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for this role?'
    },
    {
        type: 'input',
        name: 'deptID',
        message: 'What is the department id?'
    }
    ]).then(({ title, salary, deptID }) => {
        let newRole = new Role(title, deptID, salary);
        console.log(newRole);

        addRole(newRole);
    })
}

function addRole(newRole) {
    db.promise().query('INSERT INTO roles SET ?', newRole)
    nextAction();
};

function inquireEmployee(){
    console.clear();
    console.log("Let's add a new employee to the database. Please answer a few questions.");

    inquirer.prompt([{
        type: 'input',
        name: 'firstName',
        message: 'What is their first name?'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'What is their last name??'
    },
    {
        type: 'input',
        name: 'roleID',
        message: 'What is their role id?'
    },
    {
        type: 'input',
        name: 'managerID',
        message: 'What is their manager id?'
    }
    ]).then(({ firstName, lastName, roleID, managerID }) => {
        let newEmployee = new Employee(firstName, lastName, roleID, managerID);
        console.log(newEmployee);

        addEmployee(newEmployee);
    })
}

function addEmployee(newEmployee) {
    db.promise().query('INSERT INTO employees SET ?', newEmployee)
    nextAction();
};

function inquireUpdate() {
    console.clear();
    console.log("Let's update and employee role. Please answer the questions bellow.");

    inquirer.prompt([{
        type: 'input',
        name: 'employeeID',
        message: 'Which employee do you want to update? Please type their id.'
    },
    {
        type: 'input',
        name: 'newRole',
        message: 'What is their new role? Please type the role id.'
    }
    ]).then(({ employeeID, newRole }) => {
        let updateInfo = [newRole, employeeID];
        console.log(updateInfo);

        updateEmployee(updateInfo);
    })
}

function updateEmployee(updateInfo) {
    db.promise().query('UPDATE employees SET role_id=? WHERE id=?', updateInfo)
    nextAction();
};

console.clear();
nextAction();