angular.module('app')
.directive('followMe',function($routeParams, $timeout, $interval, securityService, profileService){
	
    function _controller($scope, $element, $attrs) { 

        var userCreds = securityService.currentUser();
        $scope.loggedInUserHandle = userCreds.username;
        $scope.isLoggedInUser=true;
        $scope.isFollowing=false;
        $scope.follow = function() { profileService.follow($scope,$scope.loggedInUserHandle); }

        $scope.$watch(function(){ return $scope.viewedUser },function(newVal,oldVal){
            if(oldVal!=newVal&&newVal) {
                $scope.viewingUserId=newVal;
                $scope.isLoggedInUser=false;
                $scope.isFollowing=profileService.isFollowing($scope,$scope.viewingUserId);
            }
        });

    }

    function _link(scope, iElem, iAttrs){  }

    function _gettemplate(){
        var tpl = ''
        +'<div ng-show="!isLoggedInUser && !isFollowing"><input type="button" id="f22" class="btn btn-danger btn-sm" ng-click="follow()" value="Follow!"></div>'
        +'<div ng-show="!isLoggedInUser && isFollowing"><i class="fa fa-heart fa-lg icon-left color-three"></i><span id="alreadyFollowing"> Following</span></div>';
        return tpl;
    }

	var directive = {};
	directive.scope = {viewedUser:"="}
	directive.template = _gettemplate();
	directive.controller = _controller;
	directive.link = _link;
	return directive;
		
});
