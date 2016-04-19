angular.module('app')
.directive('navBar',function(){
	
	var directive = {};
	directive.scope = {followers:"=",following:"="}
	directive.templateUrl = '/app/nav-bar2.html';
	directive.controller = _controller;
	directive.link = _link;
	return directive;
		
});

function _controller($scope, $element, $attrs, $timeout)
{
    
    function _hidealert(){ $timeout(function(){ _resetalert() },5000); }
    
    function _resetalert(){ $scope.alert=''; $scope.showAlert=false; }

    _resetalert();

    $scope.$watch(function(){return $scope.followers},function(n,o){
        if (n!=o && n) { 
        	$scope.showAlert = true;
        	$scope.alert = 'New follower!';
        	_hidealert(); 
        } 
    });
}

function _link(scope, iElem, iAttrs)
{

    scope.search = function(){}

}