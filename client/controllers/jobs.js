angular.module('lancealot.jobs', [])

  .controller('JobsController', function ($scope, Jobs) {
    $scope.jobs = [];

    Jobs.fetchJobs()
      .then(function (jobs) {
        $scope.jobs = jobs;
      });
  })

  .controller('AddJobsController', function ($scope, $location, Jobs, Clients) {
    $scope.jobs = [];

    $scope.addJob = function (job) {
      Jobs.addJob(job)
        .then(function () {
          Jobs.fetchJobs()
            .then(function (jobs) {
              $scope.jobs = jobs;
              $location.path('/');
            });
        });

      $scope.job = {};

    };

    Clients.fetchClients() 
      .then(function (clients) {
        $scope.clients = clients;
      });
  })

  .factory('Jobs', function ($http) {

    var fetchJobs = function () {
      return $http({
        method: 'GET', 
        url: '/jobs'
      }).then(function (res) {
        return res.data;
      });
    };

    var addJob = function (job) {
      return $http({
        method: 'POST',
        url: '/jobs',
        data: job
      }).then(function (res) {
        return;
      });
    };

    return {
      fetchJobs: fetchJobs,
      addJob: addJob
    };
  })
