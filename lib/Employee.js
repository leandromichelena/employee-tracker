class Employee {
    constructor(first_name, last_name, role, manager) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role;
        this.manager_id = manager;
    }

    update() {
        console.log("Updating Employee")
    };
};

module.exports = Employee;