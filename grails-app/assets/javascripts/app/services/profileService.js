angular.module('app')
.factory('profileService',function ($http, $log) {
    
    var service = {}, baseUrl = '/api/';

    service.getProfile = function(scope,id){

        $http({
            method: 'GET',
            url: baseUrl+'/account/'+id
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
            $log(m);
        });

    }

    service.getMessagesByUser = function(scope,id){
        scope.messages=[];
        $http.get(baseUrl+'/account/'+id+'/messages?max='+scope.max+'&offset='+scope.offset).then(function(resp){
            console.log('get messages',resp);

            if(resp.status==200) scope.messages=angular.copy(resp.data); 

        },function(fail){
            var m='An error has occured while trying to fetch messages. ';
            $log(m);
        });

    }

    service.getMessagesBySearchTerm = function(scope,term){
        
        scope.messages=[];
        var payload = (angular.isDefined(term)) ? {"searchTerm":term} : {"searchTerm":''};

        $http.post(baseUrl+'messages/search?max='+scope.max+'&offset='+scope.offset,payload).then(function(resp){
            console.log('get messages',resp);

            if(resp.status==200) scope.messages=angular.copy(resp.data); 

        },function(fail){
            var m='An error has occured while trying to fetch messages. ';
            $log(m);
        });

    }

    service.getFollowers = function(scope,id){
        scope.messages=[];
        $http.get(baseUrl+'/account/'+id+'/followers?max='+scope.max+'&offset='+scope.offset).then(function(resp){
            console.log('get followers',resp);

            if(resp.status==200) scope.followers=angular.copy(resp.data.followers); 

        },function(fail){
            var m='An error has occured while trying to fetch follower users. ';
            $log(m);
        });

    }

    service.getFollowing = function(scope,id){
        scope.messages=[];
        $http.get(baseUrl+'/account/'+id+'/following?max='+scope.max+'&offset='+scope.offset).then(function(resp){
            console.log('get following',resp);

            if(resp.status==200) scope.following=angular.copy(resp.data.following); 

        },function(fail){
            var m='An error has occured while trying to fetch following users. ';
            $log(m);
        });

    }

    return service;
});