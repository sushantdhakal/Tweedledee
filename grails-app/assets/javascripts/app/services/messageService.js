angular.module('app')
.factory('messageService',function ($http, $httpParamSerializer, $location, $interval, $timeout, $route, errorService) {
    
    var service = {}, baseUrl = '/api';
    var alertObj = {active:false,mesg:''}
    var messagePostedAlert = false;

    service.getMessagesByUser = function(scope,id){

        var accountId = (angular.isDefined(id)) ? id : 0,
            rPath = baseUrl+'/account/'+accountId+'/messages',
            params={};

        if(angular.isDefined(scope.max)&&scope.max>0) params.max=scope.max;
        if(angular.isDefined(scope.offset)&&scope.offset>0) params.offset=scope.offset;
        if(!_.isEmpty(params)) rPath=rPath+'?'+$httpParamSerializer(params);

        scope.messages=[];

        $http.get(rPath).then(function(resp){
            console.log('get messages by user ',resp);
            
            scope.loading=false;
            if(resp.status==200) {
                var tmp=[];
                _.each(resp.data,function(v){
                    if(angular.isDefined(v)) {
                        tmp.push({
                            handle:id,
                            dateCreated:v.dateCreated,
                            text:v.text,
                            id:v.id,
                            account:v.account
                        });
                    }
                });
                scope.messages=angular.copy(tmp);
            } 

        },function(fail){
            scope.loading=false;
            var m='An error has occured while trying to fetch messages. '+fail.status;
            scope.alert=alertObj;
            if(angular.isDefined(scope.reloader)) $interval.cancel(scope.reloader);
            errorService.showAlert(scope.alert,m);
        });

    }

    service.getMessagesBySearchTerm = function(scope){
        
        var rPath = baseUrl+'/messages/search',
            params={};

        if(angular.isDefined(scope.max)&&scope.max>0) params.max=scope.max;
        if(angular.isDefined(scope.offset)&&scope.offset>0) params.offset=scope.offset;
        if(!_.isEmpty(params)) rPath=rPath+'?'+$httpParamSerializer(params);
        
        var term = scope.searchTerm,
            payload = (angular.isDefined(term)) ? {"searchTerm":term} : {"searchTerm":''};

        $http.post(rPath,payload).then(function(resp){
            console.log('get messages by search ',resp);

            scope.loading=false;
            if(resp.status==200) {
                var tmp=[];
                _.each(resp.data,function(v){
                    if(angular.isDefined(v)&&angular.isDefined(v.message)) {
                        tmp.push({
                            handle:v.handle,
                            dateCreated:v.message.dateCreated,
                            text:v.message.text,
                            id:v.message.id,
                            account:v.message.account
                        });
                    }
                });
                scope.messages=angular.copy(tmp); 
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

    service.addMessage = function(scope, message){
        var id = scope.loggedInUserHandle;
        var payload = {text: message};
        $http.put(baseUrl+'/message/addMessage?accountId='+id,payload).then(function(resp){
            console.log('message posting  ',resp);
            if(resp.status==200){
                $route.reload();
                messagePostedAlert = true;
            }
        },function(fail){
            scope.loading=false;
            var m='An error has occured while trying post the message. '+fail.status;
            scope.alert=alertObj;
            if(angular.isDefined(scope.reloader)) $interval.cancel(scope.reloader);
            errorService.showAlert(scope.alert,m);
        });
    }

    service.messagePostedAlert = function(){
        return messagePostedAlert;
    }

    service.deleteMessage = function(scope, messageId, messageText){
        var accountId = scope.loggedInUserHandle;
        $http.put(baseUrl+'/message/deleteMessage/'+accountId+'/'+messageId).then(function(resp){
            console.log('message posting  ',resp);
            if(resp.status==200){
                $route.reload();
            }
        },function(fail){
            scope.loading=false;
            var m='An error has occured while trying post the message. '+fail.status;
            scope.alert=alertObj;
            if(angular.isDefined(scope.reloader)) $interval.cancel(scope.reloader);
            errorService.showAlert(scope.alert,m);
        });

    }

    return service;
});