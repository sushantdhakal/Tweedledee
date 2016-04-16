angular.module('app').controller('logoutController', function ($resource, $scope, $location, $http, $rootScope, securityService) {

	securityService.logout();
	$location.path('/login?logout=1');

});