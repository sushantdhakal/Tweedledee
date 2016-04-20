angular.module('app')
.directive('searchForm',function($window){
	
    function _gettemplate(){
        var tpl = '<form class="navbar-form" role="search">'+
                    '<div class="input-group">'+
                        '<input id="searchBox" type="text" ng-model="searchText" class="form-control input-sm" placeholder="Search Tweedledee..">'+
                        '<div class="input-group-btn">'+
                            '<button id="searchBtn" class="btn btn-prmiary btn-sm" type="submit" ng-click="search()"><i class="fa fa-search"></i></button>'+
                        '</div>'+
                    '</div>'+
                '</form>';
        return tpl;   
    }

    function _controller($scope, $element, $attrs) { }

    function _link(scope, iElem, iAttrs) {

        scope.search = function(){ 
            var ph = '#/search?q='+encodeURI(scope.searchText);console.log('go here ',ph)
            if(angular.isDefined(scope.searchText) ) $window.location=ph; 
        }
    
    }

	var directive = {};
	directive.scope = {}
	directive.template= _gettemplate();
	directive.controller = _controller;
	directive.link = _link;
	return directive;
		
});




