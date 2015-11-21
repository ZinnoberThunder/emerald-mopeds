var app = angular.module('lancealot', ['lancealot.jobs']);//, 'ngRoute']);

// app.config(function ($routeProvider, $httpProvider) {

//   $routeProvider
//     .when('/jobs', {
//       templateUrl: './jobs.html',
//       controller: 'JobsController'
//     });

// });

app.factory('Jobs', function ($http) {

  var fetchJobs = function () {
    $http({
      method: 'GET', 
      url: '/jobs'
    }).then(function (res) {
      return res.data;
    })
  }

  return {
    fetchJobs: fetchJobs
  };
});
