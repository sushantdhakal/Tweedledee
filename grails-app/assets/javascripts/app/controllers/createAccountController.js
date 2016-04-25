angular.module('app')
    .controller('createAccountController',
        function($scope, $location, profileService) {

            $scope.signupTwo = function(){
                var test = 1;

            }

            $scope.signupOne = function(){

                profileService.createNewAccount($scope);
                $scope.signupMsgErr = profileService.signupMsgErr();

            };
        });
