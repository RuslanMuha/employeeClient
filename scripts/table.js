(
    function () {
        let App = window.App || {};
        let $ = window.jQuery;

        function Row(employee) {

            let $tr = $('<tr></tr>', {
                'data-employee': "checkbox"
            });

            let $th1 = $('<th></th>', {
                scope: 'row'
            });
            let $th2 = $('<th></th>', {
                scope: 'row'
            });


            let $input = $('<input>', {
                type: "checkbox",
                value: employee.id
            });


            $th1.append($input);
            $th2.append(`${employee.id}`);

            let empVal = Object.values(employee).slice(1, 7);

            let $td = $(empVal).map((i, t) => {
                return $('<td/>').text(t).get(0);
            });

            $tr.append($th1).append($th2).append($td);
            this.$rowElement = $tr;
        }

        function CheckList(selector) {
            this.$checkListElement = $(selector);

        }

        CheckList.prototype.addRow = function (employee) {

            let row = new Row(employee);
            this.$checkListElement.append(row.$rowElement);

        };

        CheckList.prototype.addHandler = function (fn) {
            this.$checkListElement.on('click', 'input', (event) => {
                event.preventDefault();
                let id = event.target.value;
                fn(id);
            })

        };

        CheckList.prototype.removeRow = function (id) {
            this.$checkListElement.find(`[value="${id}"]`)
                .closest('[data-employee="checkbox"]')
                .remove();

        };

        function Budget(selector) {
            this.$budgetElement = $(selector);

        }


        Budget.prototype.addBudget = function (compName, budget) {

            const $el = $(`#${compName}`);
            if ($el) {
                $el.remove()
            }
            if (budget === 0) {
                $el.remove();
            } else {
                let $div = $('<div/>', {
                    id: compName,
                    text: `${compName} - ${budget}`
                });
                this.$budgetElement.append($div);
            }


        };

        CheckList.prototype.removeAllRow = function () {
            this.$checkListElement.empty();
        };

        App.CheckList = CheckList;
        App.Budget = Budget;
        window.App = App;
    }
)();