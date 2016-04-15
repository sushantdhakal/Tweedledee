angular.module('app').factory('errorService',function ($sce) {
	var service={}

	service.showAlert = function(alert,mesg,sty){
		if( angular.isDefined(alert) ) {
			alert.active=true;
			if( angular.isDefined(sty) ) alert.class=sty;
			else alert.class='danger';
			if(angular.isDefined(mesg)) alert.mesg=$sce.trustAsHtml(mesg);
		}
	}

	return service;
});