angular.module('app').controller('loginController', function($scope, $location, $routeParams, $timeout, securityService) {
  
  $scope.error='';
  $scope.message='';

  if( angular.isDefined($location.search().logout) ) {
    var lo=$location.search();
    if(lo.logout) {
      $scope.message='You\'ve been logged out of Tweedeldee, sorry to see you go! :-(';
      $timeout(function(){ $scope.message='';},10000);
    }
  } 

  $scope.loginAttempt = {};
  $scope.currentUserLoggedIn = "";
  
  $scope.doLogin = function() {
    securityService
      .login($scope.loginAttempt.username, $scope.loginAttempt.password)
      .finally(function(result){
        var currentUser = securityService.currentUser();
        if (currentUser) {
          delete $scope.error;
          $location.path('/api/profile');
            currentUserLoggedIn = currentUser.username;
        } else {
          $scope.error = 'Invalid login. Check you username/password.';
        }
      });
  };
  
});