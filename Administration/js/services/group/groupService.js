app.factory('groupService', ['$http', '$q', 'baseUrl', 'httpRequester', 'objectToQueryString', 'identity', function ($http, q, baseUrl, httpRequester, objectToQueryString, identity) {
    var url = baseUrl + '/api';

    return {
        getAllStudentsInGroup: function (identity, id) {
            if (!id) {
                id = '';
            }
            return httpRequester.request({
                method: 'GET',
                url: url + '/Group/GetStudentsInGroup?id=' + id,
                headers: {
                    'Authorization': 'Bearer ' + identity
                }
            });      
        },
        changeGroupDistance: function (distance,identity, id) {
            if (!id) {
                id = '';
            }
            return httpRequester.request({
                method: 'POST',
                url: url + '/Group/ChangeGroupDistance?newDistance=' + distance + "&id="+id,
                headers: {
                    'Authorization': 'Bearer ' + identity,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }
    }
}]);