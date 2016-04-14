angular.module('app')
.controller('searchController',function (
    $scope, $http, $routeParams, $interval, securityService, profileService) {

    var userCreds = securityService.currentUser();
    $scope.loggedInUserHandle = userCreds.username;
    
    if($routeParams.id) $scope.viewingUserHandle=$routeParams.id;
    else $scope.viewingUserId=$scope.loggedInUserHandle;

    var MAX_MESG=25; init(MAX_MESG);

    $interval(function(){ getMessages(); },25000);

    $scope.search = function(){
        getMessages($scope.searchTerm);
    }

    function init(max){
        $scope.max=max;
        $scope.offset=0;
        getMessages($scope.searchTerm);
    }

    function getMessages(term){ 
        if(!angular.isDefined(term)) term = '';
        profileService.getMessagesBySearchTerm($scope,term);
    }

});