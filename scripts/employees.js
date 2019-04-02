(
    function () {
        let App = window.App || {};

        function Employees() {
            this.data = {};
            this.salaryBudget = 0;
        }

        function promiseResponse(value){
            return new Promise(resolve => resolve(value));

        }


        Employees.prototype.add = function (id, employee) {
            if (this.data[id]) {
                return promiseResponse(false);
            }
            this.data[id] = employee;
            this.salaryBudget = this.salaryBudget + parseInt(employee.salary);
            return promiseResponse(true);

        };
        Employees.prototype.remove = function (id) {
            if (this.data[id]) {
                this.salaryBudget = this.salaryBudget - parseInt(this.data[id].salary);
                delete this.data[id];
                return promiseResponse(true);
            }

            return promiseResponse(false);
        };
        Employees.prototype.get = function (id) {
            console.log(`email employee: ${this.data[id]}`);
            return this.data[id];

        };

        Employees.prototype.getAll = function () {
            return promiseResponse( Object.values(this.data));

        };
        Employees.prototype.getSalaryBudget = function () {
            return this.salaryBudget;
        };

        App.Employyes = Employees;
        window.App = App;

    }
)();