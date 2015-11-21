var app = angular.module('lancealot', ['lancealot.jobs', 'ngRoute']);

app.config(function ($routeProvider, $httpProvider) {

  $routeProvider
    .when('/', {
      templateUrl: './index.html'
    })
    .when('/jobspage', {
      templateUrl: './jobs.html',
      controller: 'JobsController'
    });

});

app.factory('Jobs', function ($http) {

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

app.factory('Tasks', function ($http){
  var fetchTasks = function (id) {
    $http({
      method: 'GET',
      url: '/jobs/' + id
    }).then(function (res){
      return res.data;
    });
  };

  return {
    fetchTasks: fetchTasks
  };
});

app.factory('Clients', function ($http){
  var fetchClients = function (){
    $http({
      method: 'GET',
      url: '/clients'
    }).then(function (res){
      return res.data;
    });
  };

  return {
    fetchClients: fetchClients
  };
});
