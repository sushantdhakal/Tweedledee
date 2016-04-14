angular.module('app')
.controller('messagesController',function ($scope, $http,securityService,errorService) {

    var temp3 = securityService.currentUser();
    var userNameParameter = temp3.username;
    var baseUrl = '/api/account/' + userNameParameter;
    $http.get(baseUrl).then(function(resp){ $scope.messageCount=resp.data.messageCount; })
    
    $scope.currentUserLoggedIn =  userNameParameter;
    $scope.messages = [];
    var MAX_MESG=25

    init(MAX_MESG);

    function init(max){
        $scope.max=max;
        $scope.offset=0;
        getMessages();
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


