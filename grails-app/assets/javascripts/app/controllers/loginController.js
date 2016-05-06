angular.module('app')
.controller('loginController', 
  function($scope, $location, $window, $routeParams, $timeout, securityService) {

  $scope.error=''; $scope.message=''; $scope.pageTitle='Login'; $scope.loginAttempt = {}; $scope.currentUserLoggedIn = "";

  if(angular.isDefined($routeParams.logout) && $routeParams.logout==1){
      $scope.alerts = [{msg:"", type:'warning'}];
      $timeout(function(){ $window.location.assign('#/login'); },100000);
  }

  $scope.doLogin = function() {
    securityService.login($scope.loginAttempt.username, $scope.loginAttempt.password)
    .finally(function(result){
      var currentUser = securityService.currentUser();
      if (currentUser) {
        delete $scope.error;
        $location.path('/profile');
        currentUserLoggedIn = currentUser.username;
      } else {
        $scope.alerts = [{msg: 'Your login was invalid. Please re-enter the information or signup for a new account.', type: 'danger'}];
      }
    });
  };  

});