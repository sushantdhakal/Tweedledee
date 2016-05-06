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

        //scope.messages=[];

        $http.get(rPath).then(function(resp){
            console.log('get messages by user ',resp);
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
                $timeout(function(){ scope.loading=false; },500);
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
        
        scope.loading=true;
        var accountId = (!angular.isUndefined(scope.loggedInUserHandle)) ? scope.loggedInUserHandle : -1;
        var payload = {text:scope.messageText};

        if(accountId==-1) scope.alerts.push({msg:'Add message failed, sorry dude!',type:'danger'});
        else { 
            $http.post( baseUrl+'/account/'+accountId+'/messages',payload).then(function(resp){
                console.log('message posting resp',resp);
                if(resp.status==201){
                    var tmp = {
                        handle:accountId,
                        dateCreated:resp.data.dateCreated,
                        text:resp.data.text,
                        id:resp.data.id,
                        account:resp.data.account
                    };
                   scope.messages.unshift(tmp);
                   scope.alerts.push({msg:scope.newMesgAlert,type:'success'});
                   scope.messageText='';
                   scope.loading=false;
                }
            },function(fail){
                scope.loading=false;
                scope.alerts.push({msg:'An error has occured while trying add the message. '+fail.status,type:'danger'});
            });
        }

    }

    service.delete = function(scope){
        
        scope.loading=true;
        var accountId = (!angular.isUndefined(scope.loggedInUserHandle)) ? scope.loggedInUserHandle : -1;
        
        if(accountId==-1) scope.alerts.push({msg:'No user defined thus I can not delete this message, sorry guy.',type:'danger'});
        else{
            $http.delete(baseUrl+'/message/delete/'+scope.messageId).then(function(resp){
                scope.alerts.push({msg:'Message successfully deleted.',type:'success'});
                scope.loading=false;
                scope.refresh();
            },function(fail){
                scope.loading=false;
                scope.alerts.push({msg:'An error has occured while trying delete the message. '+fail.status,type:'danger'});
            });
        }

    }

    return service;
});