angular.module('app')
.controller('searchController',function (
    $scope, $http, $routeParams, $interval, securityService, profileService) {

    var userCreds = securityService.currentUser();
    $scope.loggedInUserHandle = userCreds.username;
    $scope.messages=[];
    $scope.max=25;
    $scope.offset=0;
    $scope.hasSearchResults=false;

    if($routeParams.id) $scope.viewingUserId=$routeParams.id;
    else $scope.viewingUserId=$scope.loggedInUserHandle;

    $scope.search = function(){
        profileService.getMessagesBySearchTerm($scope);
    }
    $scope.reset = function(){
        $scope.searchTerm='';
        $scope.messages=[];
        $scope.hasSearchResults=false;
    }
});