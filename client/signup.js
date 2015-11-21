angular.module('lancealot.signup', [])

  .controller('SignupController', function ($scope, Signup) {
    
    $scope.signupUser = function () {
      Signup.signupUser($scope.email, $scope.password);
    }
  })

  .factory('Signup', function ($http, $location) {

    var signupUser = function (email, password) {
      $http({
        method: 'POST', 
        url: '/signup',
        data: {
          email: email,
          password: password
        }
      }).then(function (res) {
        // do something with token (local storage of token)
        $location.path('/');
        return res.data; // what to do with this?
      })
    };

    return {
      signupUser: signupUser
    };
  });
