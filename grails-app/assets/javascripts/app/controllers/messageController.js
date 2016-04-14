angular.module('app')
.controller('messagesController',function (
    $scope, $http, $routeParams, $interval, securityService, profileService) {

    var userCreds = securityService.currentUser();
    $scope.loggedInUserHandle = userCreds.username;
    
    if($routeParams.id) $scope.viewingUserHandle=$routeParams.id;
    else $scope.viewingUserId=$scope.loggedInUserHandle;

    var MAX_MESG=25; init(MAX_MESG);

    $interval(function(){ getMessages(); },25000);

    function init(max){
        $scope.max=max;
        $scope.offset=0;
        getMessages();
    }

    function getMessages(id){ 
        if(!angular.isDefined(id)) id = $scope.viewingUserId;
        profileService.getMessagesByUser($scope,id);
    }

    $scope.refresh = function(){
        init(MAX_MESG);
    }

    $scope.showmore=function(){
        console.log('$scope.messageCount ',$scope.messageCount);
        var newoffset=$scope.offset+($scope.max+1);console.log('newoffset ',newoffset);
        var newend=newoffset+$scope.max;console.log('newend ',newend);
        if( newend<$scope.messageCount) { $scope.offset=newoffset; getMessages(); }
        else{
            var over=(newoffset+$scope.max)-$scope.messageCount;console.log('over '+over);
            var newmax=$scope.max-over;console.log('newmax '+newmax);
            if(newmax>0) { $scope.max=newmax; getMessages(); }
            else $scope.offset=$scope.messageCount;
        }
    }

});


