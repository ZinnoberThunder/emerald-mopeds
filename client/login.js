angular.module('lancealot.login', [])

  .controller('LoginController', function ($scope, Login) {
    
    $scope.loginUser = function () {
      Login.loginUser($scope.email, $scope.password);
    }
  })

  .factory('Login', function ($http, $location) {

    var loginUser = function (email, password) {
      $http({
        method: 'POST', 
        url: '/login',
        data: {
          email: email,
          password: password
        }
      }).then(function (res) {
        // do something with token (local storage of token)
        $location.path('/');
        console.log(res.token);
        return res.data; // what to do with this?
      })
    };

    return {
      loginUser: loginUser
    };
  });
