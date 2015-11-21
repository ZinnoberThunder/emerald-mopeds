angular.module('lancealot', [
  'lancealot.jobs',
  'lancealot.signup',
  'lancealot.login',
  'ngRoute'])

  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: './jobs.html',
        controller: 'JobsController'
      })
      .when('/login', {
        templateUrl: './login.html',
        controller: 'LoginController'
      })
      .when('/signup', {
        templateUrl: './signup.html',
        controller: 'SignupController'
      });

  })

  .factory('Jobs', function ($http) {

    var fetchJobs = function () {
      $http({
        method: 'GET', 
        url: '/jobs'
      }).then(function (res) {
        return res.data;
      })
    };

    return {
      fetchJobs: fetchJobs
    };
  });

// app.factory('Tasks', function ($http){
//   var fetchTasks = function (id) {
//     $http({
//       method: 'GET',
//       url: '/jobs/' + id
//     }).then(function (res){
//       return res.data;
//     });
//   };

//   return {
//     fetchTasks: fetchTasks
//   };
// });

// app.factory('Clients', function ($http){
//   var fetchClients = function (){
//     $http({
//       method: 'GET',
//       url: '/clients'
//     }).then(function (res){
//       return res.data;
//     });
//   };

//   return {
//     fetchClients: fetchClients
//   };
// });
