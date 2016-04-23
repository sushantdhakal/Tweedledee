angular.module('app')
.factory('securityService',
  ['$http', '$rootScope', '$location', 'webStorage', 
  function ($http, $rootScope, $location, webStorage) {
  var service = {};

  var currentUser;

  var setCurrentUser = function(user) {
    currentUser = user;
    webStorage.set('tweedledeeUser', currentUser,false);
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
    delete $rootScope.currentUser;
    delete currentUser;
    setCurrentUser(undefined);
    $location.path('/login?logout=1');
  };

  setCurrentUser(webStorage.get('tweedledeeUser', true));

  return service;
}]);

