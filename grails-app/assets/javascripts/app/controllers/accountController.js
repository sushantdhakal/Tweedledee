angular.module('app').controller('accountController', function ($resource, $scope, $http, $rootScope, securityService, $routeParams) {

    var handleName = $routeParams.param;
    $scope.userMessagesPosted = [];

    getUserDetails(handleName);
    getMessages(handleName);

     function getUserDetails(handleName) {

        $http({
            method: 'GET',
            url: '/account/' + handleName
        }).then(function successCallback(response) {
            var temp = response.data;
            $scope.nameForUser1 = temp.name;
            $scope.emailAddressForUser1 = temp.email;
            var followers = [];
            var following = [];

            for (var fol = 0; fol < temp.followers.length; fol++) {
                followers.push(temp.followers[fol].handle);
            }

            for (var fol = 0; fol < temp.following.length; fol++) {
                following.push(temp.following[fol].handle);
            }

            $scope.followersForUser1 = followers;
            $scope.followingForUser1 = following;

            console.log(response);
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };

     function getMessages(handleName){
        $http({
            method: 'GET',
            url: '/message/' + handleName + '/messages'
        }).then(function successCallback(response) {
            var temp="";
            console.log(response);
            temp = response.data;
            var tempArr = [];
            for (var i = 0; i < temp.length; i++) {
                $scope.userMessagesPosted.push({'messageCreatedDate': temp[i].dateCreated, 'messageDetail': temp[i].text});
            }
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    };
});


