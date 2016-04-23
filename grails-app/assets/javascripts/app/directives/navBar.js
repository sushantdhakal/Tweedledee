angular.module('app')
.directive('navBar',function($routeParams, $timeout, $interval, securityService, profileService){
	
    function _controller($scope, $element, $attrs) {
        
        var userCreds = securityService.currentUser();
        $scope.handle = userCreds.username;
        $scope.followers=[]; $scope.following=[]; $scope.max=0; $scope.offset=0;
        $scope.reload = function(){  
            profileService.getFollowers($scope,$scope.handle);
            profileService.getFollowing($scope,$scope.handle); 
        }
        $scope.logout = function() { securityService.logout(); }
        $scope.reloader = $interval(function(){ $scope.reload },60000);
        $scope.reload();

        // function _hidealert(){ $timeout(function(){ _resetalert() },7500); }
        
        // function _resetalert(){ $scope.alert={active:false,class:'',mesg:''} }

        // _resetalert();

        // $scope.$watch(function(){return $scope.followers},function(n,o){
        //     if (n!=o && n) { 
        //         if( (_.isArray(n) && _.isArray(o) && n.length > o.length) ) {
        //             $scope.alert.active=true;
        //             $scope.alert.class='alert-success';
        //             $scope.alert.mesg=$sce.trustAsHtml('<strong>New Follower!</strong> You have more followers.');
        //             _hidealert(); 
        //         }
        //     } 
        // });
    }

    function _link(scope, iElem, iAttrs){ }

	var directive = {};
	directive.scope = {}
	directive.templateUrl = '/app/nav-bar.html';
	directive.controller = _controller;
	directive.link = _link;
	return directive;
		
});
