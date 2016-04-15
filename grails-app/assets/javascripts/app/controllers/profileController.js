angular.module('app')
.controller('profileController',function (
    $scope, $http, $routeParams, $interval, securityService, profileService) {

    var userCreds = securityService.currentUser();
    $scope.loggedInUserHandle = userCreds.username;
    $scope.isLoggedInUser=true;
    $scope.isFollowing=false;
    $scope.showNameInput=false;
    $scope.showEmailInput=false;

    if($routeParams.id) $scope.viewingUserId=$routeParams.id;
    else $scope.viewingUserId=$scope.loggedInUserHandle;

    if($scope.viewingUserId!=$scope.loggedInUserHandle) {
        $scope.isLoggedInUser=false;
        $scope.isFollowing=profileService.isFollowing($scope,$scope.viewingUserId);
    }

    getProfile();

    //$interval(function(){ getProfile(); },25000);

    $scope.edit = function(field){
        if(field=='name') $scope.showNameInput=true;
        if(field=='email') $scope.showEmailInput=true;
    }
    
    function getProfile(id){ 
        if(!angular.isDefined(id)) id = $scope.viewingUserId;
        profileService.getProfile($scope,id);
    }

});


