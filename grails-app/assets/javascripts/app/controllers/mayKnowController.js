angular.module('app').controller('mayKnowController', function ($resource, $scope, $http, $rootScope, securityService) {

    $scope.userDetails = [];
    var temp3 = securityService.currentUser();
    var userNameParameter = temp3.username;

    var messageArr = [];

    $http({
        method: 'GET',
        url: '/api/accounts/'
    }).then(function successCallback(response) {
        var temp="";
        console.log(response);
        var temp="";
        console.log(response);
        temp = response.data;
        for (var i = 0; i < temp.length; i++) {
            var tempArr = [];
            messageArr = [];
            var currUser = temp[i].handle;
            if(currUser == userNameParameter)
                continue;
            $http({
                method: 'GET',
                url: '/api/message/'+ currUser +'/messages'
            }).then(function successCallback(response1) {
                var messageRespArr = "";

                messageRespArr = response1.data;
                for(var j=0; j<messageRespArr.length; j++){
                    messageArr.push(messageRespArr[j].text);
                }

            }, function errorCallback(response1) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
            tempArr.push(temp[i].handle, temp[i].name, temp[i].email, temp[i].followers, temp[i].following, messageArr);
            $scope.userDetails.push(tempArr);

        }
        var temp2;
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

});