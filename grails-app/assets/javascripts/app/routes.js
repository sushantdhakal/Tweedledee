angular.module('app')

  // configure the routes
  .config(function ($routeProvider) {

    $routeProvider
      .when('/login', {
        templateUrl: '/app/login.html',
        controller: 'loginController'
      })
     .when('/profile', {
          templateUrl: '/app/user-details.html',
          controller: 'profileController'
        })
      .when('/feed', {
        templateUrl: '/app/feed.html',
        controller: 'messagesController'
      })
        .when('/logout', {
            templateUrl: '/app/logout.html',
            controller: 'logoutController'
        })
        .when('/mayKnow',{
            templateUrl: '/app/user-details.html',
            controller: 'profileController'
        })
        .when('/account/:id', {
          templateUrl: '/app/user-details.html',
          controller: 'profileController'
        })
        .when('/followers',{
            templateUrl: '/app/follower.html',
            controller: 'followerController'
        })
        .when('/following',{
            templateUrl: '/app/following.html',
            controller: 'followingController'
        })
      .otherwise({
        redirectTo: '/profile'
      })
  })
    
  // Protect all routes other than login
  .run(function ($rootScope, $location, securityService) {
    $rootScope.$on('$routeChangeStart', function (event, next) {
      if (next.$$route.originalPath != '/login') {
        if (!securityService.currentUser()) {
          $location.path('/login');
        }
      }
    });
  });


