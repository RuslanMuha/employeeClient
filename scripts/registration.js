(
    function () {
       let App = window.App || {};
       let $ = window.jQuery;
        function Registration() {

        }
      Registration.prototype.addHandler = function(fn){
            $('#registration_form').on('submit',function (event) {
                let credentials={};
                event.preventDefault();
                $(event.target).serializeArray()
                    .forEach(function (e) {
                        credentials[e.name] = e.value;
                    });
               // console.log(credentials);
                fn(credentials);
            })
        };
        App.Registration = Registration;
       window.App = App;
    }
)();
