describe('messagesController', function () {
	beforeEach(module('app'));

	var $controller, $httpBackend, $window, ss, createController;
	var un ='JohnnyBravo';
	var pw ='123456';
	var respGet 	=[{"id":329,"account":{"id":3},"dateCreated":"2016-05-06T01:18:32Z","text":"This is a new message!!!!"}];
	var respPost 	={"id":329,"account":{"id":3},"dateCreated":"2016-05-06T01:18:32Z","text":"This is a new message!!!!"};
	var mesgObj 	={handle:un, dateCreated:respGet[0].dateCreated, text:respGet[0].text, id:respGet[0].id, account:respGet[0].account};

	beforeEach(inject(function (_$controller_,_$httpBackend_,_$window_,_securityService_) {
		$controller = _$controller_;
		$httpBackend = _$httpBackend_;
		ss = _securityService_;
		$window = _$window_;
		
		// Controller creator
		createController = function(cname,scope){ return $controller(cname,{$scope:scope}); }
		
		// Whitelist all template calls
		$httpBackend.whenGET(/app\/.*/).respond(200,'');

		// Let's get logged in
		$httpBackend.expectPOST('/api/login', {username:un,password:pw}).respond(200,{username:un,roles:['root'],'access_token':'xyz123'});
		ss.login(un,pw);
		$httpBackend.flush();

	}));

	describe('The message controller ',function(){

		it('should get messages for the user',function(){
			
			var $scope={};
			var controller=createController('messagesController',$scope);
			
			// Confirm it's making a call to fetch messages
			$httpBackend.expectGET('/api/account/'+$scope.loggedInUserHandle+'/messages?max='+$scope.max).respond(200,respGet);
			$httpBackend.flush();
			
			expect($scope.messages).toBeDefined();
			expect($scope.messages[0].handle).toBe(mesgObj.handle);
			expect($scope.messages[0].dateCreated).toBe(mesgObj.dateCreated);
			expect($scope.messages[0].text).toBe(mesgObj.text);
			expect($scope.messages[0].id).toBe(mesgObj.id);
			expect($scope.messages[0].account.id).toBe(mesgObj.account.id);

		});

		it('should add a new message and create an alert',function(){
			
			// Whitelist the inital get messages since we tested it above
			$httpBackend.whenGET(/api\/account\/.*\/messages\?.*/).respond(200,{});
			
			var $scope={};
			var mesg="This is a new message!";
			var controller=createController('messagesController',$scope);

			// Add a new message
			var addMesgUrl = '/api/account/'+$scope.loggedInUserHandle+'/messages';
			var payload = {text:mesg};
			
			expect($scope.newMesgAlert).toBeDefined();

			$scope.messageText=mesg;
			$scope.add();
			$httpBackend.expectPOST(addMesgUrl,payload).respond(201,respPost);
			$httpBackend.flush();

			// Make sure there is a message
			expect($scope.messages).toBeDefined();
			expect($scope.messages[0].handle).toBe(mesgObj.handle);
			expect($scope.messages[0].dateCreated).toBe(mesgObj.dateCreated);
			expect($scope.messages[0].text).toBe(mesgObj.text);
			expect($scope.messages[0].id).toBe(mesgObj.id);
			expect($scope.messages[0].account.id).toBe(mesgObj.account.id);

			// Make sure the alert is there
			expect($scope.alerts[0].msg).toBeDefined();
			expect($scope.alerts[0].msg).toBe($scope.newMesgAlert);

		});

		it('should set an alert if getting messages fails',function(){

			var $scope={};
			var controller=createController('messagesController',$scope);
			
			expect($scope.alerts[0]).not.toBeDefined();

			// Confirm it's making a call to fetch messages
			$httpBackend.expectGET('/api/account/'+$scope.loggedInUserHandle+'/messages?max='+$scope.max).respond(500,{status:500});
			$httpBackend.flush();

			expect($scope.alerts[0].msg).toBeDefined();
			expect($scope.alerts[0].msg).toContain(500);
			expect($scope.alerts[0].msg).toContain('error');

		});

		it('should set an alert if post a message fails',function(){

			$httpBackend.whenGET(/api\/account\/.*\/messages\?.*/).respond(200,{});
			
			var $scope={};
			var controller=createController('messagesController',$scope);
			
			expect($scope.alerts[0]).not.toBeDefined();

			$scope.messageText="asdfasdf";
			$scope.add();

			// Confirm it's making a call to post the message
			$httpBackend.expectPOST('/api/account/'+$scope.loggedInUserHandle+'/messages',{text:$scope.messageText}).respond(403,{status:403});
			$httpBackend.flush();

			expect($scope.alerts[0].msg).toBeDefined();
			expect($scope.alerts[0].msg).toContain(403);
			expect($scope.alerts[0].msg).toContain('error');
			
		});

		it('should set an alert if message is over 45 chars',function(){
			$httpBackend.whenGET(/api\/account\/.*\/messages\?.*/).respond(200,{});
			
			var $scope={};
			var controller=createController('messagesController',$scope);
			
			expect($scope.alerts[0]).not.toBeDefined();

			$scope.messageText="1234567890123456789012345678901234567890123456";
			$scope.add();

			expect($scope.alerts[0].msg).toBeDefined();
			expect($scope.alerts[0].msg).toBe($scope.mesgLengthError);
			$httpBackend.flush();
		
		});

		it('should refresh messages',function(){
			$httpBackend.whenGET(/api\/account\/.*\/messages\?.*/).respond(200,{});
			
			var $scope={};
			var controller=createController('messagesController',$scope);
			
			expect($scope.alerts[0]).not.toBeDefined();

			$scope.messageText="1234567890123456789012345678901234567890123456";
			$scope.add();

			expect($scope.alerts[0].msg).toBeDefined();
			expect($scope.alerts[0].msg).toBe($scope.mesgLengthError);
			$httpBackend.flush();
		
		});


	});

	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

});