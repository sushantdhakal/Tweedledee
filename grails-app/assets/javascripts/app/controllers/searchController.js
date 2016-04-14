angular.module('app')
.controller('searchController',function (
    $scope, $http, $routeParams, $interval, securityService, profileService) {

    var userCreds = securityService.currentUser();
    $scope.loggedInUserHandle = userCreds.username;
    $scope.messages=[];
    $scope.max=25;
    $scope.offset=0;

    if($routeParams.id) $scope.viewingUserId=$routeParams.id;
    else $scope.viewingUserId=$scope.loggedInUserHandle;

    $scope.search = function(){
        profileService.getMessagesBySearchTerm($scope);
    }

});