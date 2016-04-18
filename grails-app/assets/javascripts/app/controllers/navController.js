angular.module('app')
.controller('navController',function (
    $scope, $http, $routeParams, $timeout, $interval, securityService, profileService) {

    var userCreds = securityService.currentUser();
    $scope.loggedInUserHandle = userCreds.username;
    $scope.isFollowing=false;
    $scope.isLoggedInUser=true;
    $scope.loading=true;
    $scope.showLoggedInUser=false;

    if($routeParams.id) $scope.viewingUserId=$routeParams.id;
    else $scope.viewingUserId=$scope.loggedInUserHandle;

    getProfile();

    if($scope.viewingUserId!=$scope.loggedInUserHandle) {
        $scope.isLoggedInUser=false;
        profileService.isFollowing($scope);
    }

    $scope.reloader = $interval(function(){ getProfile(); },25000);

    $scope.followme = function() {
        profileService.follow($scope,$scope.loggedInUserHandle);
    }

    function getProfile(id){ 
        if(!angular.isDefined(id)) id = $scope.loggedInUserHandle;
        
        profileService.getProfile($scope,id);
    
    }

});


