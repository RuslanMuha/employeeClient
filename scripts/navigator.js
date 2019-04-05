(
    function () {
        let App = window.App || {};
        let $ = window.jQuery;

        function Navigator() {
            let token = sessionStorage.getItem('token');
            if (!token) {
                toggleLogin();
                showLogin();
            } else {
                toggleEmployee();
                showEmployee();
            }
        }


        let $li_login = $('#li_login');
        let $li_logout = $('#li_logout');
        let $li_employee = $('#li_employyes');
        let $li_signup = $('#li_signup');

        let $login = $('#card_login');
        let $employee = $('#card_employee');
        let $signup = $('#card_registr');
        let $budget = $('#title_budget');

        function toggle(a, b, c) {
            if (a) {
                $li_login.addClass('active');
            } else {
                $li_login.removeClass('active');
            }
            if (b) {
                $li_employee.addClass('active');
            } else {
                $li_employee.removeClass('active');
            }
            if (c) {
                $li_signup.addClass('active');
            } else {
                $li_signup.removeClass('active');
            }
        }

        Navigator.prototype.hidden = function (login, employee, signup, budget, li_logout, li_signup, li_login) {
            hidden(login, employee, signup, budget, li_logout, li_signup, li_login)
        };

        function hidden(login, employee, signup, budget, li_logout, li_signup, li_login) {
            $login.attr('hidden', login);
            $employee.attr('hidden', employee);
            $signup.attr('hidden', signup);
            $budget.attr('hidden', budget);
            $li_logout.attr('hidden', li_logout);
            $li_signup.attr('hidden', li_signup);
            $li_login.attr('hidden', li_login);
        }

        function toggleLogin() {
            toggle(true, false, false);
        }

        function showLogin() {
            hidden(false, true, true, true, true, false, false);
        }


        function toggleEmployee() {
            toggle(false, true, false)

        }

        function showEmployee() {
            let token = sessionStorage.getItem('token');
            if (token) {
                hidden(true, false, true, false, false, true, true);
            } else {
                hidden(true, false, true, false, true, false, false);
            }

        }

        function showSignup() {
            hidden(true, true, false, true,true,false,false);
        }

        function toggleSignup() {
            toggle(false, false, true);
        }

        function showLogOut() {
            hidden(false, true, true, true, true, false, false);
        }

        $('#li_employyes').on('click', (event) => {
            event.preventDefault();
            toggleEmployee();
            showEmployee();

        });

        $('#li_signup').on('click', (event) => {
            event.preventDefault();
            toggleSignup();
            showSignup();

        });

        $('#li_login').on('click', (event) => {
            event.preventDefault();
            toggleLogin();
            showLogin();
        });



        $('#li_logout').on('click', (event) => {
            event.preventDefault();
            sessionStorage.removeItem('token');
            toggleLogin();
            showLogOut()

        });
        App.Navigator = Navigator;
        window.App = App;

    }
)();