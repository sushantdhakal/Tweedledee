angular.module('app')
.controller('followingController', function (
    $scope, $http, $routeParams, $interval, securityService, profileService) {

    var userCreds = securityService.currentUser();
    $scope.loggedInUserHandle = userCreds.username;
    
    if($routeParams.id) $scope.viewingUserId=$routeParams.id;
    else $scope.viewingUserId=$scope.loggedInUserHandle;

    getFollowing();

    $interval(function(){ getFollowing(); },25000);

    function getFollowing(id){ 
        if(!angular.isDefined(id)) id = $scope.viewingUserId;
        profileService.getFollowing($scope,id);
        profileService.getFollowers($scope,id);
    }

});