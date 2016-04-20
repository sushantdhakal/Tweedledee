angular.module('app').factory('errorService',function ($sce) {
	var service={}

	service.showAlert = function(alert,mesg){
		if( angular.isDefined(alert) ) {
			alert.active=true;
			alert.class='alert-danger'
			if(angular.isDefined(mesg)) alert.mesg=$sce.trustAsHtml(mesg);
		}
	}

	return service;
});