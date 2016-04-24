angular.module('app')
.controller('messagesController',function (
    $scope, $http, $routeParams, $location, $interval, securityService, profileService, messageService) {

    var search=false;
    var userCreds = securityService.currentUser();
    $scope.loggedInUserHandle = userCreds.username;
    $scope.loading=true;
    $scope.isLoggedInUser=true;
    $scope.searchTerm='';
    
    if( angular.isDefined($location.search().q) ) {
        search=true;
        $scope.searchTerm=$location.search().q;
    }

    if($routeParams.id) { $scope.viewingUserId=$routeParams.id; $scope.isLoggedInUser=false; }
    else $scope.viewingUserId=$scope.loggedInUserHandle;

    var MAX_MESG=10; init(MAX_MESG);

    //$interval(function(){ getMessages(); },25000);

    function init(max){
        $scope.max=max;
        $scope.offset=0;
        getMessages();
    }

    function getMessages(id){ 
        $scope.loading=true;
        if(!angular.isDefined(id)) id = $scope.viewingUserId;
        if(!search) messageService.getMessagesByUser($scope,id);
        else messageService.getMessagesBySearchTerm($scope);
    }

    $scope.refresh = function(){
        init(MAX_MESG);
    }

    $scope.showmore=function(){
        console.log('$scope.messageCount ',$scope.messageCount);
        var newoffset=$scope.offset+($scope.max+1);
        var newend=newoffset+$scope.max;
        if( newend<$scope.messageCount) { $scope.offset=newoffset; getMessages(); }
        else{
            var over=(newoffset+$scope.max)-$scope.messageCount;
            var newmax=$scope.max-over;
            if(newmax>0) { $scope.max=newmax; getMessages(); }
            else $scope.offset=$scope.messageCount;
        }
    }

    $scope.addMessage = function(message){
        messageService.addMessage($scope, message);
        $scope.messagePostedAlert = messageService.messagePostedAlert;
    }

});


