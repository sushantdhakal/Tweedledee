angular.module('app')
.factory('messageService',function ($http, $interval, $timeout, $route, errorService) {
    
    var service = {}, baseUrl = '/api';
    var alertObj = {active:false,mesg:''}

    service.getMessagesByUser = function(scope,id){

        var accountId = (angular.isDefined(id)) ? id : 0;

        scope.messages=[];

        $http.get(baseUrl+'/account/'+accountId+'/messages?max='+scope.max+'&offset='+scope.offset).then(function(resp){
            console.log('get messages',resp);
            $timeout(function(){scope.loading=false;},1000);
            if(resp.status==200) scope.messages=angular.copy(resp.data); 

        },function(fail){
            scope.loading=false;
            var m='An error has occured while trying to fetch messages. '+fail.status;
            scope.alert=alertObj;
            if(angular.isDefined(scope.reloader)) $interval.cancel(scope.reloader);
            errorService.showAlert(scope.alert,m);
        });

    }

    service.getMessagesBySearchTerm = function(scope){
        
        var term = scope.searchTerm;

        var payload = (angular.isDefined(term)) ? {"searchTerm":term} : {"searchTerm":''};

        $http.post(baseUrl+'/messages/search?max='+scope.max+'&offset='+scope.offset,payload).then(function(resp){
            console.log('get messages',resp);

            scope.loading=false;

            if(resp.status==200) {
                scope.messages=angular.copy(resp.data); 
                scope.hasSearchResults=true;
            }

        },function(fail){
            scope.loading=false;
            var m='An error has occured while trying to fetch messages. '+fail.status;
            scope.alert=alertObj;
            if(angular.isDefined(scope.reloader)) $interval.cancel(scope.reloader);
            errorService.showAlert(scope.alert,m);
        });

    }

    service.save = function(scope,id){

        var accountId = (angular.isDefined(id)) ? id : 0;
        var payload = {name:scope.name,email:scope.email};

        $http.put(baseUrl+'/account/'+accountId,payload).then(function(resp){
            console.log('update account  ',resp);
            if(resp.status==200) $route.reload();
        },function(fail){
            scope.loading=false;
            var m='An error has occured while trying edit you profile. '+fail.status;
            scope.alert=alertObj;
            if(angular.isDefined(scope.reloader)) $interval.cancel(scope.reloader);
            errorService.showAlert(scope.alert,m);
        });

    }

    return service;
});