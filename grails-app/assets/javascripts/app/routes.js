angular.module('app')

  // configure the routes
  .config(function ($routeProvider) {

    $routeProvider
      .when('/login', {
        templateUrl: '/app/login2.html',
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
      .when('/search', {
        templateUrl: '/app/feed.html',
        controller: 'messagesController'
      })
      .when('/logout', {
          template: '',
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
	  .when('/contact',{
            templateUrl: '/app/contact.html'
        })
        .when('/signup',{
            templateUrl: '/app/signup1.html',
            controller: 'createAccountController'
        })
    .otherwise({
      redirectTo: '/profile'
    })
  })
    
  // Protect all routes other than login

    .run(function ($rootScope, $location, securityService) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if(typeof next!=='undefined' && typeof next.$$route!=='undefined' && next.$$route.originalPath=='/signup'){
                $location.path('/signup');
            }
            else if (typeof next!=='undefined' && typeof next.$$route!=='undefined' && typeof next.$$route.originalPath!=='undefined' && next.$$route.originalPath!='/login') {
                if (!securityService.currentUser()) {
                    $location.path('/login');
                }
            }
        });
    });


