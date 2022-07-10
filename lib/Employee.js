class Employee {
    constructor(id, first_name, last_name, role, manager) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role = role;
        this.manager = manager;
    }

    update() {
        console.log("Updating Employee")
    };
};

module.exports = Employee;