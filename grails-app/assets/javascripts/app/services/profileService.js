angular.module('app')
    .factory('profileService',function ($http, $interval, $location, $timeout, $route, $httpParamSerializer, errorService) {

        var service = {}, baseUrl = '/api';
        var alertObj = {active:false,mesg:''}
        var imgs = {
            "admin":"placeholderimg4.png",
            "sushantdhakal":"sushant.jpg",
            "paulM":"placeholderimg3.png",
            "mikeCalvo":"placeholderimg2.png"
        };
        var signupMsgErr = false;

        service.getProfile = function(scope,id){

            var accountId = (angular.isDefined(id)) ? '/'+id : '';

            if(accountId == '/' + scope.loggedInUserHandle){
                $location.path('/profile');
            }
            $http({
                method: 'GET',
                url: baseUrl+'/account'+accountId
            }).then(function successCallback(resp) {
                console.log('get profile',resp);
                scope.loading=false;
                if(resp.status==200){
                    scope.name                 =resp.data.name;
                    scope.profileId            =resp.data.id;
                    scope.handle               =resp.data.handle;
                    scope.email                =resp.data.email;
                    scope.messageCount         =resp.data.messageCount;
                    scope.followers            =angular.copy(resp.data.followers);
                    scope.following            =angular.copy(resp.data.following);
                    scope.profileimg           =(imgs[scope.handle])?imgs[scope.handle]:"placeholderimg2.png";
                }

            }, function errorCallback(fail) {
                scope.loading=false;
                var m='An error has occured while trying to fetch profile data. ';
                if(fail.status==404) m=m+' User was not found (404).';
                if(angular.isDefined(scope.reloader)) $interval.cancel(scope.reloader);
                scope.alert=alertObj;
                errorService.showAlert(scope.alert,m);
            });
        }

        service.getFollowers = function(scope,id){

            var accountId = (angular.isDefined(id)) ? id : 0,
                rPath = baseUrl+'/account/'+accountId+'/followers',
                params={};

            if(angular.isDefined(scope.max)&&scope.max>0) params.max=scope.max;
            if(angular.isDefined(scope.offset)&&scope.offset>0) params.offset=scope.offset;
            if(!_.isEmpty(params)) rPath=rPath+'?'+$httpParamSerializer(params);

            scope.messages=[];
            $http.get(rPath).then(function(resp){
                console.log('get followers',resp);
                scope.loading=false;
                if(resp.status==200) scope.followers=angular.copy(resp.data.followers);

            },function(fail){
                scope.loading=false;
                var m='An error has occured while trying to fetch follower users. '+fail.status;
                scope.alert=alertObj;
                if(angular.isDefined(scope.reloader)) $interval.cancel(scope.reloader);
                errorService.showAlert(scope.alert,m);
            });

        }

        service.getFollowing = function(scope,id){

            var hasScope = (scope!==null) ? true : false,
                accountId = (angular.isDefined(id)) ? id : 0,
                rPath = baseUrl+'/account/'+accountId+'/following',
                params={};

            if(angular.isDefined(scope.max)&&scope.max>0) params.max=scope.max;
            if(angular.isDefined(scope.offset)&&scope.offset>0) params.offset=scope.offset;
            if(!_.isEmpty(params)) rPath=rPath+'?'+$httpParamSerializer(params);

            scope.messages=[];

            $http.get(rPath).then(function(resp){
                console.log('get following',resp);
                scope.loading=false;
                if(resp.status==200) scope.following=angular.copy(resp.data.following);

            },function(fail){
                scope.loading=false;
                var m='An error has occured while trying to fetch following users. '+fail.status;
                scope.alert=alertObj;
                if(angular.isDefined(scope.reloader)) $interval.cancel(scope.reloader);
                errorService.showAlert(scope.alert,m);
            });

        }

        service.isFollowing = function(scope){
            var ret = true;
            $http.get(baseUrl+'/account/'+scope.viewingUserId+'/followers').then(function(resp){
                console.log('compare followers',resp.data);
                scope.isFollowing=false;
                if(resp.status==200){
                    angular.forEach(resp.data.followers,function(follower){
                        if(follower.handle==scope.loggedInUserHandle) scope.isFollowing=true;
                    })
                }
            },function(fail){ console.log('follower compare failed',fail); })

            return ret;
        }

        service.follow = function(scope,id){

            var accountId = (angular.isDefined(id)) ? id : 0;

            $http.get(baseUrl+'/account/'+accountId+'/follow?followerId='+scope.viewingUserId).then(function(resp){
                console.log('add  follower ',resp);
                if(resp.status==200) {
                    scope.isFollowing=true;
                    $route.reload();
                    //$location.path('/account/'+scope.viewingUserId);
                }
            },function(fail){
                scope.loading=false;
                var m='An error has occured while trying to add a follower. '+fail.status;
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

        service.createNewAccount = function(scope){
            var fullName = scope.c_fullName;
            var username = scope.c_username;
            var password = scope.c_password;
            var email = scope.c_email;

            var payload = {fullName:fullName,username:username,password:password,email:email};

            $http.put('/createNewAccount',payload).then(function(resp){
                console.log('create new account  ',resp);
                if(resp.data.error==123){
                    signupMsgErr = true;
                }
                else{
                    $location.path('/login')
                }
            });
        }

        service.signupMsgErr = function(){
            return signupMsgErr;
        }

        return service;
    });