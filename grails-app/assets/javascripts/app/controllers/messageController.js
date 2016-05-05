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
    $scope.sourceData = {};
    console.log(' handle',$scope.loggedInUserHandle);

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
        console.log('messages ',$scope.messages);
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
        messageService.addMessage($scope.loggedInUserHandle, message);
       // $scope.messagePostedAlert = messageService.messagePostedAlert;
    }

    $scope.deleteMessage = function(messageId, messageText){
        messageService.deleteMessage($scope, messageId, messageText);

    }

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        $scope.items = {handle:$scope.loggedInUserHandle, message:size, opType:'repost'};

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/app/confirmation.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
        });
    };

    $scope.deleteConf = function (messageId, size) {

        $scope.items = {handle:$scope.loggedInUserHandle, messageId:messageId, message:size, opType:'delete'};

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/app/confirmationDelete.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
});

angular.module('app').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items, messageService) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function (handle, message) {
        messageService.addMessage(handle, message);
        $uibModalInstance.close($scope.selected.item);
    };

    //    service.deleteMessage = function(loggedInUserHandle, messageId){

    $scope.deleteOk = function (handle, messageId) {
        messageService.deleteMessage(handle, messageId);
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});


