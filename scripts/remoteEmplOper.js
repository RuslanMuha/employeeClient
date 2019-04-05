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
            let token = sessionStorage.getItem('token');
            if(!token)token=' ';
            return fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    'x-auth-token':token
                },
                body: JSON.stringify(data)
            })

        }

        RemoteDataStore.prototype.add = function (id, employee) {
            const urlPost = this.serverUrl + '/employee/add';
            let token = sessionStorage.getItem('token');
            if(!token)token=' ';
            return $.ajax({
                url:urlPost,
                type:'POST',
                data:JSON.stringify(employee),
                contentType:'application/json',
                headers: {
                    'x-auth-token':token
                }
            });
            // return data(urlPost, 'POST', employee);
        };

        RemoteDataStore.prototype.remove = function (id) {
            const urlDelete = this.serverUrl + '/employee/remove?id=' + encodeURIComponent(id);
            let token = sessionStorage.getItem('token');
            if(!token)token=' ';
            return $.ajax({
                url: urlDelete,
                type: 'DELETE',
                headers: {
                    'x-auth-token':token
                }

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
                url: urlGet,
            });

        };

        RemoteDataStore.prototype.getSalary = function (companyName) {
            const url = this.serverUrl + '/employee/salary?companyName=' + encodeURIComponent(companyName);
            let res;
            $.ajax({
                url: url,
                type: 'GET',
                async: false,
                success: function (response) {
                    res = response;
                }
            });
            return res;

        };
        RemoteDataStore.prototype.getCompany = function (company) {
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

        RemoteDataStore.prototype.login = function (credentials) {
                return $.ajax({
                    url: this.serverUrl + '/user/login',
                    type: 'POST',
                    data: JSON.stringify(credentials),
                    contentType: 'application/json'
                })
            };
        RemoteDataStore.prototype.signup = function (credentials) {
                return $.ajax({
                    url: this.serverUrl + '/user/signup',
                    type: 'POST',
                    data: JSON.stringify(credentials),
                    contentType: 'application/json'
                })
            };
        App.RemoteDataStore = RemoteDataStore;
    }
)();