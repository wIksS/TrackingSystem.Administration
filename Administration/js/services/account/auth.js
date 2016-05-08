/**
 * Created by Виктор on 27.9.2014 г..
 */

app.factory('auth', ['$http','$q','baseUrl','httpRequester','objectToQueryString',function($http,q,baseUrl,httpRequester,objectToQueryString){
    var url = baseUrl;

    return {
        login: function (user) {

            var deffered = q.defer();
            user = user || {};
            user['grant_type'] = 'password';

            return httpRequester.request({
                method: 'POST',
                url: url + '/token',
                data: objectToQueryString.parse(user),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        },
        register: function (user) {
            user = user || {};

            return httpRequester.request({
                method: 'POST',
                url: url + '/api/account/register',
                data: objectToQueryString.parse(user),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        },
        getUserRoles: function (user) {
            var deffered = q.defer();
            user = user || {};
            user['grant_type'] = 'password';

            return httpRequester.getAuthorized(url + '/api/account/GetRoles', user.token);

            //return httpRequester.request({
            //    method: 'GET',
            //    url: url + '/api/account/GetRoles',
            //    //data: objectToQueryString.parse(user),
            //    headers: {
            //        'Content-Type': 'application/x-www-form-urlencoded',
            //        'Authorization': 'Bearer ' + user.token
            //    }
            //});
        }
    }
}])