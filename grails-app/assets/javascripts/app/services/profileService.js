angular.module('app')
.factory('profileService',function ($http, $interval, errorService) {
    
    var service = {}, baseUrl = '/api/';
    var alertObj = {active:false,mesg:''}

    service.getProfile = function(scope,id){

        var accountId = (angular.isDefined(id)) ? '/'+id : '';

        $http({
            method: 'GET',
            url: baseUrl+'/account'+accountId
        }).then(function successCallback(resp) {
            console.log('get profile',resp);

            if(resp.status==200){
                scope.name                 =resp.data.name;
                scope.handle               =resp.data.handle;
                scope.email                =resp.data.email;
                scope.messageCount         =resp.data.messageCount;
                scope.followers            =angular.copy(resp.data.followers);
                scope.following            =angular.copy(resp.data.following);
            }

        }, function errorCallback(fail) {
            var m='An error has occured while trying to fetch profile data. ';
            if(fail.status==404) m=m+' User was not found (404).';
            if(angular.isDefined(scope.reloader)) $interval.cancel(scope.reloader);
            scope.alert=alertObj;
            errorService.showAlert(scope.alert,m);
        });

    }

    service.getMessagesByUser = function(scope,id){

        var accountId = (angular.isDefined(id)) ? id : 0;

        scope.messages=[];

        $http.get(baseUrl+'/account/'+accountId+'/messages?max='+scope.max+'&offset='+scope.offset).then(function(resp){
            console.log('get messages',resp);

            if(resp.status==200) scope.messages=angular.copy(resp.data); 

        },function(fail){
            var m='An error has occured while trying to fetch messages. '+fail.status;
            scope.alert=alertObj;
            if(angular.isDefined(scope.reloader)) $interval.cancel(scope.reloader);
            errorService.showAlert(scope.alert,m);
        });

    }

    service.getMessagesBySearchTerm = function(scope){
        
        var term = scope.searchTerm;

        var payload = (angular.isDefined(term)) ? {"searchTerm":term} : {"searchTerm":''};

        $http.post(baseUrl+'messages/search?max='+scope.max+'&offset='+scope.offset,payload).then(function(resp){
            console.log('get messages',resp);

            if(resp.status==200) {
                scope.messages=angular.copy(resp.data); 
                scope.hasSearchResults=true;
            }

        },function(fail){
            var m='An error has occured while trying to fetch messages. '+fail.status;
            scope.alert=alertObj;
            if(angular.isDefined(scope.reloader)) $interval.cancel(scope.reloader);
            errorService.showAlert(scope.alert,m);
        });

    }

    service.getFollowers = function(scope,id){

        var accountId = (angular.isDefined(id)) ? id : 0;

        scope.messages=[];
        $http.get(baseUrl+'/account/'+accountId+'/followers?max='+scope.max+'&offset='+scope.offset).then(function(resp){
            console.log('get followers',resp);

            if(resp.status==200) scope.followers=angular.copy(resp.data.followers); 

        },function(fail){
            var m='An error has occured while trying to fetch follower users. '+fail.status;
            scope.alert=alertObj;
            if(angular.isDefined(scope.reloader)) $interval.cancel(scope.reloader);
            errorService.showAlert(scope.alert,m);
        });

    }

    service.getFollowing = function(scope,id){

        var accountId = (angular.isDefined(id)) ? id : 0;

        scope.messages=[];
        $http.get(baseUrl+'/account/'+accountId+'/following?max='+scope.max+'&offset='+scope.offset).then(function(resp){
            console.log('get following',resp);

            if(resp.status==200) scope.following=angular.copy(resp.data.following); 

        },function(fail){
            var m='An error has occured while trying to fetch following users. '+fail.status;
            scope.alert=alertObj;
            if(angular.isDefined(scope.reloader)) $interval.cancel(scope.reloader);
            errorService.showAlert(scope.alert,m);
        });

    }

    service.isFollowing = function(scope){
        var ret = true;
        var id = scope.viewingUserId;
        var following = (angular.isDefined(scope.following)) ? scope.following : [];
        console.log('following tttoooo',following)
        angular.forEach(following,function(followee){
            if(followee.id==id || followee.handle==id) ret = true;
        })
        
        return ret;
    }

    return service;
});