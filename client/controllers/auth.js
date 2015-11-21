angular.module('lancealot.auth', [])

  .factory('Auth', function ($http, $window) {

    var storeToken = function (token) {
      $window.localStorage.setItem('token', token);
    };

    var retrieveToken = function (token) {
      return $window.localStorage.getItem('token');
    };

    var isAuth = function () {
      return !!$window.localStorage.getItem('token');
    };

    return {
      isAuth: isAuth,
      storeToken: storeToken,
      retrieveToken: retrieveToken
    };
  });
