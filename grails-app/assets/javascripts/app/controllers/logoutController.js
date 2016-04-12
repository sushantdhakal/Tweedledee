angular.module('app').controller('logoutController', function ($resource, $scope, $http, $rootScope, securityService) {

    $scope.doLogout = function() {
        securityService.doLogout();
        delete $scope.error;
        $location.path('/logout');
    };
});