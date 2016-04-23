angular.module('app')
.factory('securityService',
  function ($http, $rootScope, $window, webStorage) {
  var service = {};

  var currentUser;

  var setCurrentUser = function(user) {
    currentUser = user;
    webStorage.set('tweedledeeUser',currentUser,false);
    $rootScope.currentUser = currentUser;
    console.log(' current user ',currentUser);
  };

  var loginSuccess = function (response) {
    setCurrentUser({
      username: response.data.username,
      roles: response.data.roles,
      token: response.data['access_token']
    });
  };

  var loginFailure = function () {
    setCurrentUser(undefined);
  };

  service.login = function (username, password) {
    var loginPayload = {username: username, password: password};
    return $http.post('/api/login', loginPayload).then(loginSuccess, loginFailure);
  };

  service.currentUser = function () {
    return currentUser;
  };

  service.logout = function() {
    setCurrentUser(undefined);
    $window.location = '#/login?logout=1';
  };

  setCurrentUser(webStorage.get('tweedledeeUser', true));

  return service;
});

