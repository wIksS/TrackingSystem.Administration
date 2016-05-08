/**
 * Created by Виктор on 28.9.2014 г..
 */

app.factory('httpRequester',['$http','$q', function($http,q){
    return{
        request: function httpRequest(request) {
            var deffered = q.defer();
            $http(request)
                .success(function (data) {
                    deffered.resolve(data);
                })
                .error(function (err) {
                    deffered.reject(err);
                });

            return deffered.promise;
        },
        get: function (url){
            return $.ajax({
                method: "GET",
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        getAuthorized: function (url,identity){
            return $.ajax({
                method: "GET",
                url: url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded', "Authorization" : "Bearer " + identity}
            })
        },        
        post: function (url,data){
            return $.ajax({
                method: "POST",
                url: url,
                data: objectToQueryString.parse(data),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        postAuthorized: function (url,data){
            return $.ajax({
                method: "POST",
                url: url,
                data: objectToQueryString.parse(data),
                headers: {'Content-Type': 'application/x-www-form-urlencoded', "Authorization" : "Bearer " + data.identity},     
            })
        },
        custom: function (type,url,data){
            return $.ajax({
                method: type,
                url: url,
                data: objectToQueryString.parse(data),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        },
        customAuthorized: function (type,url,data){
            return $.ajax({
                method: type,
                url: url,
                data: objectToQueryString.parse(data),
                headers: {'Content-Type': 'application/x-www-form-urlencoded', "Authorization" : "Bearer " + data.identity}
            })
        },
        customAuthorizedUrlData: function (type, url, data) {
            return $.ajax({
                method: type,
                url: url + '?' + objectToQueryString.parse(data),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', "Authorization": "Bearer " + data.identity }
            })
        }
    }
}])