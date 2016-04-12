angular.module('app').factory('securityService', ['$http', '$rootScope', function ($http, $rootScope) {
  var service = {};
  var currentUser;

  var loginSuccess = function (response) {
    currentUser = {
      username: response.data.username,
      roles: response.data.roles,
      token: response.data['access_token']
    };

    $rootScope.$emit('userChange', currentUser)
  };

  var loginFailure = function () {
    currentUser = undefined
    delete $rootScope.currentUser;
  };

  service.login = function (username, password) {
    var loginPayload = {username: username, password: password};
    return $http.post('/api/login', loginPayload).then(loginSuccess, loginFailure);
  };

  service.logout = function (){
    currentUser = null;
  }

  service.currentUser = function () {
    return currentUser;
  };

  return service;
}]);