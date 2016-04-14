angular.module('app').controller('searchController', function ($resource, $scope, $http, $rootScope, securityService, $location, $routeParams) {

    var handleName = $routeParams.param;
    var temp3 = securityService.currentUser();
    var userNameParameter = temp3.username;


    var searchSuccess = function (response) {
        /*currentUser = {
            username: response.data.username,
            roles: response.data.roles,
            token: response.data['access_token']
        };*/
    };

    var searchFailure = function () {
       /* currentUser = undefined
        delete $rootScope.currentUser;*/
    };

    $scope.searchResults = function (searchableText) {
        var searchPayload = {searchTerm: searchableText};
        return $http.post('/api/messages/search', searchPayload).then(searchSuccess, searchFailure);
    };

});