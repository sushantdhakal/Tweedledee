describe('securityService', function () {
  
  // beforeEach(module('app'));

  // var securityService;
  // var $httpBackend;

  // beforeEach(inject(function (_securityService_, _$httpBackend_) {
  //   securityService = _securityService_;
  //   $httpBackend = _$httpBackend_;
  // }));

  // describe('login', function () {
  //   it('handles valid login', function () {
  //     $httpBackend.expectPOST('/api/login', {username: 'u', password: 'p'}).respond(200, {username: 'earl', roles: ['root'], 'access_token': 'xyz123'});
  //     securityService.login('u', 'p');
  //     $httpBackend.flush();
  //     var user = securityService.currentUser();
  //     expect(user).toBeDefined();
  //     expect(user.username).toBe('earl');
  //     expect(user.roles).toContain('root');
  //     expect(user.token).toBe('xyz123');
  //   });

  //   it('handles invalid login', function () {
  //     $httpBackend.expectPOST('/api/login', {username: 'u', password: 'p'}).respond(403, {status: 403, message: 'Forbidden'});
  //     securityService.login('u', 'p');
  //     $httpBackend.flush();
  //     var user = securityService.currentUser();
  //     expect(user).toBeUndefined();
  //   });
  // });

  // describe('logout', function() {
  //   var $location;
  //   beforeEach(inject(function(_$window_) {
  //     $window = _$window_;
  //     securityService.logout();
  //   }));

  //   it('clears out the current user', function() {
  //     expect(securityService.currentUser()).toBeUndefined();
  //   });

  //   it ('routes back to login screen', function() {
  //     expect($window.location).toMatch(/login/);
  //   })
  // });
  // afterEach(function () {
  //   $httpBackend.verifyNoOutstandingExpectation();
  //   $httpBackend.verifyNoOutstandingRequest();
  // });

});