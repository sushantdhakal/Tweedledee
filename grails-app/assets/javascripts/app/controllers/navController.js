angular.module('app')
.controller('navController',function (
    $scope, $http, $routeParams, $timeout, $interval, securityService, profileService) {

    var userCreds = securityService.currentUser();
    $scope.loggedInUserHandle = userCreds.username;
    $scope.isFollowing=false;
    $scope.isLoggedInUser=true;

    if($routeParams.id) $scope.viewingUserId=$routeParams.id;
    else $scope.viewingUserId=$scope.loggedInUserHandle;

    getProfile();

    if($scope.viewingUserId!=$scope.loggedInUserHandle) {
        $timeout(function(){
            console.log('following xxx',$scope.following)
            $scope.isLoggedInUser=false;
            $scope.isFollowing=profileService.isFollowing($scope);
            console.log('isFollowing',$scope.isFollowing)
        },100);
    }

    $scope.reloader = $interval(function(){ getProfile(); },25000);

    function getProfile(id){ 
        if(!angular.isDefined(id)) id = $scope.viewingUserId;
        
        profileService.getProfile($scope,id);
    
    }

});


