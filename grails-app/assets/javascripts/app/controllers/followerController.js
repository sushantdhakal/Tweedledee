angular.module('app')
.controller('followerController', function (
    $scope, $http, $routeParams, $interval, securityService, profileService) {

    var userCreds = securityService.currentUser();
    $scope.loggedInUserHandle = userCreds.username;
    
    if($routeParams.id) $scope.viewingUserId=$routeParams.id;
    else $scope.viewingUserId=$scope.loggedInUserHandle;

    getFollowers();

    $interval(function(){ getFollowers(); },25000);

    function getFollowers(id){ 
        if(!angular.isDefined(id)) id = $scope.viewingUserId;
        profileService.getFollowers($scope,id);
        profileService.getFollowing($scope,id);
    }

});