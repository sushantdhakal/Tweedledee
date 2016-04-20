angular.module('app')
.controller('profileController',function (
    $scope, $http, $route, $routeParams, $interval, securityService, profileService) {

    var userCreds = securityService.currentUser();
    $scope.loggedInUserHandle = userCreds.username;
    $scope.isLoggedInUser=true;
    $scope.isFollowing=false;
    $scope.showNameInput=false;
    $scope.showEmailInput=false;
    $scope.currentToken = userCreds.token;

    if($routeParams.id) $scope.viewingUserId=$routeParams.id;
    else $scope.viewingUserId=$scope.loggedInUserHandle;

    if($scope.viewingUserId!=$scope.loggedInUserHandle) {
        $scope.isLoggedInUser=false;
        $scope.isFollowing=profileService.isFollowing($scope,$scope.viewingUserId);
    }

    getProfile();

    //$interval(function(){ getProfile(); },25000);

    $scope.edit = function(field){
        if($scope.isLoggedInUser){
            if(field=='name') $scope.showNameInput=!$scope.showNameInput;
            if(field=='email') $scope.showEmailInput=!$scope.showEmailInput;
        }
    }

    $scope.save = function(){
        if($scope.isLoggedInUser){
            profileService.save($scope, $scope.profileId);
        }
    }

    $scope.cancel = function(){
        if($scope.isLoggedInUser){
            $route.reload();
        }
    }
    
    $scope.followme = function() {
        profileService.follow($scope,$scope.loggedInUserHandle);
    }
    
    function getProfile(id){ 
        if(!angular.isDefined(id)) id = $scope.viewingUserId;
        profileService.getProfile($scope,id);
    }

});


