(
    function () {
       let App = window.App || {};
       let $ = window.jQuery;
        function Login() {

        }
        Login.prototype.addHandler = function(fn){
            $('#login_form').on('submit',function (event) {
                let credentials={};
                event.preventDefault();
                $(event.target).serializeArray()
                    .forEach(function (e) {
                        credentials[e.name] = e.value;
                    });
                fn(credentials,this);

            })
        };
        App.Login = Login;
       window.App = App;
    }
)();
