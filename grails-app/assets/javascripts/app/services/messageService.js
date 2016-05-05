angular.module('app')
.factory('messageService',function ($http, $httpParamSerializer, $location, $window, $interval, $timeout, $route, errorService) {
    
    var service = {}, baseUrl = '/api';
    var alertObj = {active:false,mesg:''}

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
            scope.alerts.push({msg:'An error has occured while trying to fetch messages. '+fail.status,type:'danger'});
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
            scope.alerts.push({msg:'An error has occured while trying to fetch messages for the search term'+term+'. '+fail.status,type:'danger'});
        });

    }

    service.add = function(scope){
        
        var accountId = (!angular.isUndefined(scope.loggedInUserHandle)) ? scope.loggedInUserHandle : -1;
        var payload = {text:scope.messageText};

        if(accountId!=-1) scope.alerts.push({msg:'No user defined!',type:'danger'});
        else{
            $http.post( baseUrl+'/account/'+accountId+'/messages',payload).then(function(resp){
                console.log('message posting resp',resp);
                if(resp.status==200){
                   scope.messages.unshift(resp.data);
                   scope.alerts.push({msg:'New messages successfully added!',type:'success'});
                }
            },function(fail){
                scope.loading=false;
                scope.alerts.push({msg:'An error has occured while trying add the message. '+fail.status,type:'danger'});
            });
        }

    }

    service.delete = function(scope){
        
        var accountId = (!angular.isUndefined(scope.loggedInUserHandle)) ? scope.loggedInUserHandle : -1;
        
        if(accountId!=-1) scope.alerts.push({msg:'No user defined thus I can not delete this message, sorry guy.',type:'danger'});
        else{
            $http.delete(baseUrl+'/account/'+accountId+'/messages/'+scope.messageId).then(function(resp){
                if(resp.status==200){
                    $route.reload();
                }
            },function(fail){
                scope.loading=false;
                scope.alerts.push({msg:'An error has occured while trying delete the message. '+fail.status,type:'danger'});
            });
        }

    }

    return service;
});