angular.module('app').controller('followingController', function ($resource, $scope, $http, $rootScope, securityService, $routeParams) {

    $scope.userFollowing = [];
    var temp3 = securityService.currentUser();
    var userNameParameter = temp3.username;
    var tempFollowingList = [];

    $scope.currentUserLoggedIn =  userNameParameter;

    $http({
        method: 'GET',
        url: '/account/'+userNameParameter+'/following'
    }).then(function successCallback(response) {
        $scope.numberOfFollowing = response.data.followingCount

        tempFollowingList = response.data.following;
        for (var i = 0; i < tempFollowingList.length; i++) {
            var temp = [];
            temp.push({'name': tempFollowingList[i].name, 'handle': tempFollowingList[i].handle, 'email': tempFollowingList[i].handle});
            $scope.userFollowing.push(temp);
        }
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });



});