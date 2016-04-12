angular.module('app').config(function ($provide, $httpProvider) {
  $provide.factory('httpAuthTokenInterceptor', function ($rootScope) {

    var token;

    $rootScope.$on('userChange', function (event, user) {
      if (user) {
        token = user.token;
        console.log('token: '+token);
      } else {
        token = undefined;
      }
    });

    return {
      'request': function (config) {
        if (token) {
          config.headers['Content-Type'] = 'application/json';
          config.headers['X-Auth-Token'] = token;
        }
        return config;
      }
    };
  });

  $httpProvider.interceptors.push('httpAuthTokenInterceptor')
});