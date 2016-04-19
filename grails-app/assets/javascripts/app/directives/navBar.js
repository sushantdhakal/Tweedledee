angular.module('app')
.directive('navBar',function(){
	
	var directive = {};
	directive.scope = {followers:"=",following:"="}
	directive.templateUrl = '/app/nav-bar.html';
	directive.controller = _controller;
	directive.link = _link;
	return directive;
		
});

function _controller($scope, $element, $attrs, $timeout, $sce)
{
    
    function _hidealert(){ $timeout(function(){ _resetalert() },7500); }
    
    function _resetalert(){ $scope.alert={active:false,class:'',mesg:''} }

    _resetalert();

    $scope.$watch(function(){return $scope.followers},function(n,o){
        if (n!=o && n) { 
            if( (_.isArray(n) && _.isArray(o) && n.length > o.length) ) {
            	$scope.alert.active=true;
                $scope.alert.class='alert-success';
                $scope.alert.mesg=$sce.trustAsHtml('<strong>New Follower!</strong> You have more followers.');
            	_hidealert(); 
            }
        } 
    });
}

function _link(scope, iElem, iAttrs)
{

    scope.search = function(){}

}