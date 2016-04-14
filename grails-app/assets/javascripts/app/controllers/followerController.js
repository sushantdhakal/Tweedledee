angular.module('app').controller('followerController', function ($resource, $scope, $http, $rootScope, securityService, $routeParams) {

    $scope.userFollowers = [];
    var temp3 = securityService.currentUser();
    var userNameParameter = temp3.username;
    var tempFollowersList = [];

    $scope.currentUserLoggedIn =  userNameParameter;

    $http({
        method: 'GET',
        url: '/api/account/'+userNameParameter+'/followers'
    }).then(function successCallback(response) {
        $scope.numberOfFollowers = response.data.followerCount

        tempFollowersList = response.data.followers;
        for (var i = 0; i < tempFollowersList.length; i++) {
            var temp = [];
            temp.push({'name': tempFollowersList[i].name, 'handle': tempFollowersList[i].handle, 'email': tempFollowersList[i].handle});
            $scope.userFollowers.push(temp);
        }
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
});