angular.module('app')
.controller('followerController', function (
    $scope, $http, $routeParams, securityService, profileService) {

    var userCreds = securityService.currentUser();
    $scope.loggedInUserHandle = userCreds.username;
    
    if($routeParams.id) $scope.viewingUserId=$routeParams.id;
    else $scope.viewingUserId=$scope.loggedInUserHandle;

    profileService.getFollowers($scope,$scope.viewingUserId);
   
});