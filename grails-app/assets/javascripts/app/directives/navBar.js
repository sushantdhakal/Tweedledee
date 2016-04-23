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
        $scope.logout = function() { 
            $interval.cancel($scope.reloader);
            securityService.logout(); 
        }
        $scope.reloader = $interval(function(){ $scope.reload },60000);
        $scope.reload();

    }

    function _link(scope, iElem, iAttrs){ }

	var directive = {};
	directive.scope = {}
	directive.templateUrl = '/app/nav-bar.html';
	directive.controller = _controller;
	directive.link = _link;
	return directive;
		
});
