angular.module('app').factory('errorService',function ($sce) {
	var service={}

	
	service.showAlert = function(alert,mesg){
		
		if( angular.isDefined(alert) ) {
			alert.active=true;
			if(angular.isDefined(mesg0)) alert.mesg=mesg
		}
	}

	return service;
});