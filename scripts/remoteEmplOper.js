(
    function () {

        let App = window.App || {};
        window.App = App;
        let $ = window.jQuery;

        function RemoteDataStore(url) {
            if (!url) throw Error("url isn't defined");
            this.serverUrl = url;

        }


        function data(url, method, data = {}) {
            return fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(data)
            })

        }

        RemoteDataStore.prototype.add = function (id, employee) {
            const urlPost = this.serverUrl + '/employee/add';
            return data(urlPost, 'POST', employee);
        };

        RemoteDataStore.prototype.remove = function (id) {
            const urlDelete = this.serverUrl + '/employee/remove?id=' + encodeURIComponent(id);
           return $.ajax({
                url: urlDelete ,
                type: 'DELETE',

            });


        };

        RemoteDataStore.prototype.get = function (id) {
            let res;
            $.ajax({
                url: this.serverUrl + '/employee/?id=' + encodeURIComponent(id),
                type: 'GET',
                async: false,
                success: function (response) {
                    res = response;
                }
            });

            return res;
        };


        RemoteDataStore.prototype.getAll = function () {
            const urlGet = this.serverUrl + '/employee/all';
             return $.ajax({
                url:urlGet,
            });

        };

        RemoteDataStore.prototype.getSalary = function (companyName) {
            let res;
            $.ajax({
                url: this.serverUrl + '/employee/salary?companyName='+ encodeURIComponent(companyName),
                type: 'GET',
                async: false,
                success: function (response) {
                    res = response;
                }
            });
            return res;

        };
        RemoteDataStore.prototype.getCompany = function(company){
            let res;
            $.ajax({
                url: this.serverUrl + '/employee/company?companyName=' + encodeURIComponent(company),
                type: 'GET',
                async: false,
                success: function (response) {
                    res = response;
                }
            });

            return res;
        };


        App.RemoteDataStore = RemoteDataStore;
    }
)();