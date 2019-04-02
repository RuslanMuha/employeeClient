(
    function () {
        let App=window.App || {};
        function FormHandler(selector){
            this.$formElement=$(selector);
            if(!this.$formElement)
                throw Error("wrong selector");
            if(this.$formElement.length===0)
                throw Error("doesn't look as a form")

        }
        FormHandler.prototype.addHandler=function(fn){
            this.$formElement.on
            ('submit',function (event) {
                event.preventDefault();
                const data={};
                $(this).serializeArray().forEach(function (item) {
                    data[item.name]=item.value;
                });
                fn(data).then(()=>{
                    this.reset();
                    this.elements[0].focus();
                }).catch(()=>alert('Server is not available'));


            })
        };

        FormHandler.prototype.addIdHandler = function(fn){

            this.$formElement.on('input','[data-employee-role="id"]',(event)=>{
                event.preventDefault();
                event.target.setCustomValidity(fn(event.target.value))
            })
        };

        FormHandler.prototype.addSalaryHandler = function(fn){
            this.$formElement.on('input','[data-employee-role="salary"]',(event)=>{
                event.preventDefault();
                event.target.setCustomValidity(fn(event.target.value))
            })
        };




        App.FormHandler=FormHandler;
        window.App=App;
    }

)();