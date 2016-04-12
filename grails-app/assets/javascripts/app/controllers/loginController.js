angular.module('app').controller('loginController', function($scope, $location, securityService) {
  
  $scope.loginAttempt = {};
    $scope.currentUserLoggedIn = "";
  
  $scope.doLogin = function() {
    securityService
      .login($scope.loginAttempt.username, $scope.loginAttempt.password)
      .finally(function(result){
        var currentUser = securityService.currentUser();
        if (currentUser) {
          delete $scope.error;
          $location.path('/profile');
            currentUserLoggedIn = currentUser.username;
        } else {
          $scope.error = 'Invalid login. Check you username/password.';
        }
      });
  };
  
});