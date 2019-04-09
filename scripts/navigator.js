(
    function () {
        let App = window.App || {};
        let $ = window.jQuery;

        function Navigator() {
            let token = sessionStorage.getItem('token');
            if (!token) {
                this.toggleLogin();
                this.showLogin();
            } else {
                this.toggleEmployee();
                this.showEmployee();
            }

            $('#li_employyes').on('click', (event) => {
                event.preventDefault();
                this.toggleEmployee();
                this.showEmployee();

            }).bind(this);

            $('#li_signup').on('click', (event) => {
                event.preventDefault();
                this.toggleSignup();
                this.showSignup();

            }).bind(this);

            $('#li_login').on('click', (event) => {
                event.preventDefault();
                this.toggleLogin();
                this.showLogin();
            }).bind(this);


            $('#li_logout').on('click', (event) => {
                event.preventDefault();
                sessionStorage.removeItem('token');
                this.toggleLogin();
                this.showLogOut()

            }).bind(this);

        }


        let $li_login = $('#li_login');
        let $li_logout = $('#li_logout');
        let $li_employee = $('#li_employyes');
        let $li_signup = $('#li_signup');

        let $login = $('#card_login');
        let $employee = $('#card_employee');
        let $signup = $('#card_registr');
        let $budget = $('#title_budget');

        Navigator.prototype.showLogin = function () {
            $login.attr('hidden', false);
            $employee.attr('hidden', true);
            $signup.attr('hidden', true);
            $budget.attr('hidden', true);
            $li_logout.attr('hidden', true);
            $li_signup.attr('hidden', false);
            $li_login.attr('hidden', false);
        };

        Navigator.prototype.toggleLogin = function () {
                $li_login.addClass('active');
                $li_employee.removeClass('active');
                $li_signup.removeClass('active');
        };


        Navigator.prototype.toggleEmployee = function () {
            $li_login.removeClass('active');
            $li_employee.addClass('active');
            $li_signup.removeClass('active');
        };

        Navigator.prototype.showEmployee = function ()  {
            let token = sessionStorage.getItem('token');
            $login.attr('hidden', true);
            $employee.attr('hidden', false);
            $signup.attr('hidden', true);
            $budget.attr('hidden', false);

            if (token) {
                $li_logout.attr('hidden', false);
                $li_signup.attr('hidden', true);
                $li_login.attr('hidden', true);

            } else {
                $li_logout.attr('hidden', true);
                $li_signup.attr('hidden', false);
                $li_login.attr('hidden', false);
            }

        };

        Navigator.prototype.showSignup= function ()  {

            $login.attr('hidden', true);
            $employee.attr('hidden', true);
            $signup.attr('hidden', false);
            $budget.attr('hidden', true);
            $li_logout.attr('hidden', true);
            $li_signup.attr('hidden', false);
            $li_login.attr('hidden', false);
        };

        Navigator.prototype.toggleSignup = function ()  {
            $li_login.removeClass('active');
            $li_employee.removeClass('active');
            $li_signup.addClass('active');
        };

        Navigator.prototype.showLogOut = function () {
            $login.attr('hidden', false);
            $employee.attr('hidden', true);
            $signup.attr('hidden', true);
            $budget.attr('hidden', true);
            $li_logout.attr('hidden', true);
            $li_signup.attr('hidden', false);
            $li_login.attr('hidden', false);
        };


        App.Navigator = Navigator;
        window.App = App;

    }
)();