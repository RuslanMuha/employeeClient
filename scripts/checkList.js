(
    function () {
        let App = window.App || {};
        let $ = window.jQuery;

        function Row(employee) {
            let $div = $('<div></div>', {
                class: 'form-check',
                'data-employee': "checkbox"
            });

            let $label = $('<label></label>', {
                class: 'form-check-label col'
            });

            let $input = $('<input>', {
                class: "form-check-input",
                type: "checkbox",
                value: employee.employeeIdentifier
            });


            let content = `id: ${employee.employeeIdentifier},
            email: ${employee.email},
            employee's name: ${employee.employeeNames ? employee.employeeNames : 'empty'},
            gender: ${employee.gender},
            salary: ${employee.salary},
            title: ${employee.title ? employee.title : 'empty'}`;

            $label.append($input).append(content);
            $div.append($label);
            this.$rowElement = $div;

        }


        function CheckListEmbed(selector) {
            this.$checkListElement = $(selector);

        }

        CheckListEmbed.prototype.addRow = function (employee) {

            let row = new Row(employee);
            this.$checkListElement.append(row.$rowElement);


        };

        CheckListEmbed.prototype.addHandler = function (fn) {
            this.$checkListElement.on('click', 'input', (event) => {
                event.preventDefault();
                let id = event.target.value;
                fn(id);
            })

        };

        CheckListEmbed.prototype.removeRow = function (employeeIdentifier) {
            this.$checkListElement.find(`[value="${employeeIdentifier}"]`)
                .closest('[data-employee="checkbox"]')
                .remove();

        };

        function BudgetEmbed(selector) {
            this.$budgetElement = $(selector);

        }

        Budget.prototype.addBudget = function (budget) {
            $(this.$budgetElement).empty();
            this.$budgetElement.append(`${budget}`);
        };


        App.CheckListEmbed = CheckListEmbed;
        App.BudgetEmbed = BudgetEmbed;
        window.App = App;


    }
)();