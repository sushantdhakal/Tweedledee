angular.module('app')
.controller('navController',function (
    $scope, $http, $routeParams, $interval, securityService, profileService) {

    var userCreds = securityService.currentUser();
    $scope.loggedInUserHandle = userCreds.username;
    
    if($routeParams.id) $scope.viewingUserHandle=$routeParams.id;
    else $scope.viewingUserId=$scope.loggedInUserHandle;

    getProfile();

    $interval(function(){ getProfile(); },25000);

    function getProfile(id){ 
        if(!angular.isDefined(id)) id = $scope.viewingUserId;
        profileService.getProfile($scope,id);
    }

});


