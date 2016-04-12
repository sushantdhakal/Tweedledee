angular.module('app').controller('feedController', function ($resource, $scope, $http, $rootScope, securityService) {

  $scope.userMessages = [];
  var temp3 = securityService.currentUser();
  var userNameParameter = temp3.username;

  $scope.currentUserLoggedIn =  userNameParameter;

  $http({
    method: 'GET',
    url: '/message/'+userNameParameter+'/messages'
  }).then(function successCallback(response) {
    var temp="";
    console.log(response);
    temp = response.data;
    for (var i = 0; i < temp.length; i++) {
      var tempArr = [];
      tempArr.push(temp[i].dateCreated, temp[i].text)
      $scope.userMessages.push(tempArr);
    }
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
});