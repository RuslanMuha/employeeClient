const HOST = 'http://localhost:3000';
const SELECTOR_FORM = '[data-employee="employee"]';
const SELECTOR_CHECKLIST = '[data-employee="checklist"]';
const SELECTOR_BUDGET = '[data-employee="budget"]';
const MIN_SALARY = 8000;
const MAX_SALARY = 50000;
const error = (e) => {
    alert('Server is not available');
};

let nav = new App.Navigator();

let login = new App.Login();
let registr = new App.Registration();
let employee = new App.RemoteDataStore(HOST);
let company = new App.Company(employee);
let handler = new App.FormHandler(SELECTOR_FORM);
let table = new App.CheckList(SELECTOR_CHECKLIST);
let budget = new App.Budget(SELECTOR_BUDGET);


let latestUpdate = {};

registr.addHandler((credentials, reg) => {
    return employee.signup(credentials).then(res => {
        reg.reset();
        nav.hidden(false, true, true, true, true, false, false);
        let $li_login = $('#li_login');
        let $li_signup = $('#li_signup');
        $li_login.addClass('active');
        $li_signup.removeClass('active');

    }).catch((e) => {
        alert('failed registration');
        console.log(e);
    })
});

login.addHandler((credentials, log) => {
    return employee.login(credentials).then((token) => {
        log.reset();
        let $li_employee = $('#li_employyes');
        nav.hidden(true, false, true, false, false, true, true);
        $li_employee.addClass('active');
        sessionStorage.setItem('token', token.data);

    }).catch((e) => {

        alert('failed login');
        console.log(e)

    })
});
handler.addHandler((employee) => {
    return company.hireEmployee(employee).then((response) => {
        if (response) {
            const {companyName} = employee;
            table.addRow(employee);
            budget.addBudget(companyName, company.computeSalaryBudget(companyName));
        }
    }).catch(error)


});

table.addHandler((id) => {
    company.dismissEmployee(id).then((empl) => {
        if (empl) {
            const {companyName} = empl.data;
            table.removeRow(id);
            let bud = company.computeSalaryBudget(companyName);
            budget.addBudget(companyName, bud);
        }
    }).catch(error)


});

handler.addIdHandler((id) => {
    const empl = employee.get(id);
    if (Object.keys(empl.data).length !== 0) return empl.message;
    else return ""


});
handler.addSalaryHandler((salary) => {
    return salary >= MIN_SALARY && salary <= MAX_SALARY ? "" : "salary must be in range 8000-50000";
});


function displayAll() {

    employee.getAll().then((employee) => {

        if (JSON.stringify(latestUpdate) !== JSON.stringify(employee.data)) {
            table.removeAllRow();
            Object.values(employee.data).forEach((e) => {
                table.addRow(e);
                budget.addBudget(e.companyName, company.computeSalaryBudget(e.companyName))
            });
            latestUpdate = {...employee.data};
        }

    })

}

handler.addCompanyHandler(() => {
    displayAll();

});

handler.getEmployeesByCompany((companyName, input) => {
    employee.getCompany(companyName).then(companyEmployees => {
        input.reset();
        console.log(companyEmployees);
        const employees = {...companyEmployees.data.employees.peoples};
        if (JSON.stringify(latestUpdate) !== JSON.stringify(employees)) {
            table.removeAllRow();
            Object.values(employees).forEach((e) => {
                table.addRow(e.id);
                budget.removeBudget();
                budget.addBudget(e.id.companyName,company.computeSalaryBudget(e.id.companyName))
            });
            latestUpdate = {...employees};
        }

    })
});

// displayAll();
//setInterval(displayAll, 1000);



