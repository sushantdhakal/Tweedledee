angular.module('app').controller('accountController', function ($resource, $scope, $http, $rootScope, securityService, $location, $routeParams) {

    var handleName = $routeParams.param;
    $scope.userMessagesPosted = [];
    var temp3 = securityService.currentUser();
    var userNameParameter = temp3.username;
    $scope.iAmFollowing = false;
    $scope.followingUser = "";

    getUserDetails(handleName);
    getMessages(handleName);
    checkIfAlreadyFollowing(userNameParameter);

    function checkIfAlreadyFollowing(userNameParameter){
        $http({
            method: 'GET',
            url: '/account/'+userNameParameter+'/following'
        }).then(function successCallback(response) {
            $scope.numberOfFollowing = response.data.followingCount

            tempFollowingList = response.data.following;
            for (var i = 0; i < tempFollowingList.length; i++) {

                if(tempFollowingList[i].handle == handleName){
                    $scope.iAmFollowing = true;
                    $scope.followingUser = handleName;
                    break;
                }
            }
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }

    function getUserDetails(handleName) {

        $http({
            method: 'GET',
            url: '/account/' + handleName
        }).then(function successCallback(response) {

            var temp = response.data;

            if(temp.handle == userNameParameter){
                $location.path('/profile');
            }
            else {
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
            }
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


