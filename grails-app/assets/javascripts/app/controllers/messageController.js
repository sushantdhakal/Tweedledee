angular.module('app')
.controller('messagesController',function (
    $scope, $http, $routeParams, $location, $uibModal, $interval, securityService, profileService, messageService) {

    var search=false;
    var userCreds = securityService.currentUser();
    $scope.loggedInUserHandle = userCreds.username;
    $scope.loading=true;
    $scope.isLoggedInUser=true;
    $scope.searchTerm='';
    $scope.animationsEnabled = true;
    $scope.currentMessage = '';
    $scope.alerts = [];
    $scope.mesgLengthError = 'Messages are limited to only 45 characters';

    console.log('CTLR handle',$scope.loggedInUserHandle);

    if( angular.isDefined($location.search().q) ) {
        search=true;
        $scope.searchTerm=$location.search().q;
    }

    if($routeParams.id) { $scope.viewingUserId=$routeParams.id; $scope.isLoggedInUser=false; }
    else $scope.viewingUserId=$scope.loggedInUserHandle;

    var MAX_MESG=10; 
    init(MAX_MESG);

     /**
     *
     * Private static functions that only need to be called within this controller
     *
     **/

        function init(max){
            $scope.max=max;
            $scope.offset=0;
            getMessages();
            console.log('messages ',$scope.messages);
        }

        function getMessages(id){ 
            $scope.loading=true;
            if(!angular.isDefined(id)) id = $scope.viewingUserId;
            if(!search) messageService.getMessagesByUser($scope,id);
            else messageService.getMessagesBySearchTerm($scope);
        }

     /**
     *
     * Public functions to be called from $scope
     *
     **/

        $scope.refresh = function(){ 

            init(MAX_MESG); 

        }

        $scope.add = function(){ 
            
            if( $scope.messageText.length>45 ) $scope.alerts.push({msg:$scope.mesgLengthError,type:'danger'});
            else messageService.add($scope);
            
        }

    /**
     *
     * The following is all extras and not part of the requirements for the 
     * assignment.
     *
     **/

    $scope.animationsEnabled = true;

    function getNewModal(message,view){

        return $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: view,
            controller: function ($scope,$uibModalInstance,message) {
                $scope.message=message;
                $scope.go=function(){ $uibModalInstance.close(message); };
                $scope.cancel=function(){ $uibModalInstance.dismiss('cancel'); };
            },
            resolve: { message: function(){ return message; } }
        });

    }

    $scope.repost = function (message) {

        var modal = getNewModal(message,'/app/repost-modal.html');
        
        if(!angular.isDefined(modal)){
            modal.result.then(function(message){ console.log('repost modal close mesg ',message);
                $scope.messageText =message.text;
                messageService.add($scope); 
            },function(){ console.log('delete modal canceled '); });
        }
    }

    $scope.delete = function (message) {

        var modal = getNewModal(message,'/app/delete-modal.html');

        if(!angular.isDefined(modal)){
            modal.result.then(function(message){console.log('delete modal close mesg ',message); 
                $scope.messageId =message.id;
                messageService.delete($scope); 
            },function(){ console.log('delete modal canceled '); });
        }
    
    }

    $scope.more = function(){

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

});


