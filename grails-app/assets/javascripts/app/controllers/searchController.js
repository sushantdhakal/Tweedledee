angular.module('app')
.controller('searchController',function (
    $scope, $http, $routeParams, $location, $interval, securityService, profileService) {

    var userCreds = securityService.currentUser();
    $scope.loggedInUserHandle = userCreds.username;
    $scope.messages=[];
    $scope.max=25;
    $scope.offset=0;
    $scope.hasSearchResults=false;
    $scope.loading=false;

    if($routeParams.id) $scope.viewingUserId=$routeParams.id;
    else $scope.viewingUserId=$scope.loggedInUserHandle;

    $scope.search = function(){
        $scope.loading=true;
        //profileService.getMessagesBySearchTerm($scope);
        $location.path('/search?q='+$scope.searchTerm)
    }
    $scope.reset = function(){
        $scope.searchTerm='';
        $scope.messages=[];
        $scope.hasSearchResults=false;
    }
});