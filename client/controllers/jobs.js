angular.module('lancealot.jobs', [])

  .controller('JobsController', function ($scope, Jobs, Clients) {
    $scope.jobs = [{
      client: {
        name: 'fb'
      },
      description: 'dev',
      rate: 50,
      formattedStart: 1,
      formattedEnd: 2,
      _id: 0
    }, {
      client: {
        name: 'google'
      },
      description: 'dev',
      rate: 60,
      formattedStart: 3,
      formattedEnd: 4,
      _id: 1
    }];

    Clients.fetchClients() 
      .then(function (clients) {
        $scope.clients = clients;
      });

    Jobs.fetchJobs()
      .then(function (jobs) {
        $scope.jobs = jobs;
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
        return res.data.job;
      });
    };

    return {
      fetchJobs: fetchJobs,
      addJob: addJob
    };
  })
