const inquirer = require('inquirer');

// // Imports the objects from the lib folder
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');


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
                    new Department();
                    break;
                case 'Add a role':
                    new Role();
                    break;
                case 'Add an employee':
                    new Employee();
                    break;
                case 'Update an employee role':
                    Employee.update();
                    break;
            }
        });
};

nextAction();