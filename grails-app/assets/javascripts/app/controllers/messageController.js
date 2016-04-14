angular.module('app')
.controller('messagesController',function ($scope, $http,securityService,errorService) {

    var temp3 = securityService.currentUser();
    var userNameParameter = temp3.username;
    var baseUrl = '/api/account/' + userNameParameter;

    $scope.currentUserLoggedIn =  userNameParameter;
    $scope.messages = [];
    
    resetPaging(25,0,1,25);
    getMessages();

    $scope.pagenext = function(){
        var newstart = ( ($scope.end+1)<$scope.messageCount ) ? ($scope.end+1) : $scope.start;
        var newend = ( (newstart+$scope.max)<$scope.messageCount ) ? (newstart+$scope.max) : $scope.messageCount-($scope.messageCount-$scope.end);
        var newoffset = newend-newstart;
        var newmax = ( (newstart+$scope.max)<$scope.messageCount ) ? $scope.max : ($scope.messageCount-$scope.end);
        resetPaging(newmax,newoffset,newstart,newend); getMessages();
    }

    $scope.pageprev = function(){
        resetPaging($scope.max,$scope.offset); getMessages();
    }

    function resetPaging(max,offset,start,end){

        $scope.offset       = offset;
        $scope.max          = max;
        $scope.start        = start;
        $scope.end          = end;

    }

    function getMessages(){
        $scope.messages=[];
        $http.get(baseUrl+'/messages?max='+$scope.max+'&offset='+$scope.offset).then(function(resp){console.log(resp)

            if(resp.status==200) $scope.messages=angular.copy(resp.data); 

        },function(fail){
            var m='An error has occured while trying to fetch messages. ';
            if(fail.message) m=m+fail.fail.message;
            if(fail.error) m=m+fail.fail.error;
            errorService.showAlert(scope.alert,m);
        });

    }

});


