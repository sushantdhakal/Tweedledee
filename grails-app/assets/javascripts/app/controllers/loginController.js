angular.module('app')
.controller('loginController', 
  function($scope, $location, $window, $routeParams, $timeout, securityService) {

$scope.error='';
$scope.message='';
$scope.pageTitle='Login';

if( angular.isDefined($location.search().logout) ) {
  var lo=$location.search();
  if(lo.logout) {
    $scope.alerts = [{msg:'You\'ve been logged out of Tweedeldee, sorry to see you go! :-(', type:'info'}];
    var a = $timeout(function(){ $window.location.assign('#/login'); },10000);
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
    $location.path('/profile');
    currentUserLoggedIn = currentUser.username;
  } else {
    $scope.alerts = [{msg: 'Invalid login', type: 'danger'}];
  }
});

};

});