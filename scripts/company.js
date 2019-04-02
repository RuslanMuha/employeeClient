(
    function () {
        let App = window.App || {};

        function Company(employee) {
            this.employee = employee;

        }

        Company.prototype.hireEmployee = function (employee) {
            if (!employee.id) {
                throw Error("id not defined")
            }
            return this.employee.add(employee.id,employee);

        };
        Company.prototype.dismissEmployee = function (id) {
            return this.employee.remove(id);

        };
        Company.prototype.computeSalaryBudget = function (companyName) {


            return this.employee.getSalary(companyName).data;

        };

        Company.prototype.printEmployees = function () {
            console.log(`company ${this.id} has following employees`);
            this.employee.getAll(function (empl) {
                Object.values(empl).forEach(o=>console.log(o))

            })
        };
        App.Company = Company;
        window.App = App;
    }
)();