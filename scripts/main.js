const HOST = 'http://localhost:8080';
const SELECTOR_FORM = '[data-employee="employee"]';
const SELECTOR_CHECKLIST = '[data-employee="checklist"]';
const SELECTOR_BUDGET = '[data-employee="budget"]';
const MIN_SALARY = 8000;
const MAX_SALARY = 50000;
const error = (e) =>{alert('Server is not available'); console.log(e)} ;

let employee = new App.RemoteDataStore(HOST);
let company = new App.Company(employee);
let handler = new App.FormHandler(SELECTOR_FORM);
let checkList = new App.CheckList(SELECTOR_CHECKLIST);
let budget = new App.Budget(SELECTOR_BUDGET);


let latestUpdate = {};

handler.addHandler((employee) => {
    return company.hireEmployee(employee).then((response) => {
        if (response) {
            const {companyName} = employee;
            checkList.addRow(employee);
            budget.addBudget(companyName,company.computeSalaryBudget(companyName));
        }
    }).catch(error)


});

checkList.addHandler((id) => {
    company.dismissEmployee(id).then((empl) => {
        if (empl) {
            const {companyName} = empl.data;
            checkList.removeRow(id);
            let bud;
            try{
              bud = company.computeSalaryBudget(companyName)
            }
            catch (e) {
                bud = 0;
            }

            budget.addBudget(companyName,bud);
        }
    }).catch(error)


});

handler.addIdHandler((id) => {
    const empl = employee.get(id);
    if(Object.keys(empl.data).length !== 0) return empl.message;
    else return ""



});
handler.addSalaryHandler((salary) => {
    return salary >= MIN_SALARY && salary <= MAX_SALARY ? "" : "salary must be in range 8000-50000";
});


function displayAll() {

    let companies = {};
    employee.getAll().then((employee) => {

        if (JSON.stringify(latestUpdate) !== JSON.stringify(employee.data)) {
            checkList.removeAllRow();
            Object.values(employee.data).forEach((e) => {
                companies[e.companyName] = company.computeSalaryBudget(e.companyName);
                checkList.addRow(e);
            });
            const size = Object.keys(companies).length;
            for (let i = 0; i < size;i++){
                budget.addBudget(Object.keys(companies)[i],Object.values(companies)[i])
            }

            latestUpdate = {...employee.data};
        }

    })

}

displayAll();
setInterval(displayAll, 1000);



