describe('messagesController', function () {
	beforeEach(module('app'));

	var $controller;
	var $httpBackend;
	var $window;
	var ss;
	var createController;


	beforeEach(inject(function (_$controller_,_$httpBackend_,_$window_,_securityService_) {
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;
		ss = _securityService_;
		$window = _$window_;
		
		// Controller creator
		createController = function(cname,scope){ return $controller(cname,{$scope:scope}); }
		
		// Whitelist all template calls
		$httpBackend.whenGET(/app\/.*/).respond(200,'');

	}));

	describe('The messages controller ',function(){

		it('should have a logged in user handle',function(){
			
			// Confirm it's making a call to fetch messages
			$httpBackend.expectGET(/api\/account\/.*\/messages\?.*/).respond(200,{});
			
			var $scope={};
			var controller=createController('messagesController',$scope);
			$httpBackend.flush();
			
			// Grab the current user and confirm our logged in user handle matches the currrent username
			var user = ss.currentUser();
			expect($scope.loggedInUserHandle).toBeDefined();
			expect($scope.loggedInUserHandle).toEqual(user.username);

		});

		it('should add a message and reload the profile page with message posted flag',function(){
			
			// Whitelist the inital get messages since we tested it above
			$httpBackend.whenGET(/api\/account\/.*\/messages\?.*/).respond(200,{});
			
			var $scope={};
			var mesg="This is a new message!";
			var controller=createController('messagesController',$scope);
			expect($scope.messages).toBeDefined();
			expect($scope.messages).toEqual([]);

			// Add a new message
			var addMesgUrl = '/api/message/addMessage?accountId='+$scope.loggedInUserHandle;
			var payload = {text:mesg};
			
			$scope.addMessage(mesg);
			$httpBackend.expectPOST(addMesgUrl,payload).respond(200,{});
			$httpBackend.flush();

			// Confirm it reloaded the profile page with the message posted flag set
			expect($window.location).toMatch(/profile\?messagePost=1/);
		});

	});

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

});