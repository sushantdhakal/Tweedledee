angular.module('app').config(function ($provide, $httpProvider) {
  $provide.factory('httpAuthTokenInterceptor', function ($q, $injector) {

    return {
      'request': function (config) {
        var securityService = $injector.get('securityService');
        var currentUser = securityService.currentUser();
        if (currentUser) {
          config.headers['Content-Type'] = 'application/json';
          config.headers['X-Auth-Token'] = currentUser.token;
        }
        return config;
      },

      'responseError': function (rejection) {
        if (rejection && rejection.status == 401) {
          var securityService = $injector.get('securityService');
          securityService.logout();
        }
        return $q.reject(rejection);
      }

    };
  });

  $httpProvider.interceptors.push('httpAuthTokenInterceptor')
});