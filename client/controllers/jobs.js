angular.module('lancealot.jobs', [])

  .controller('JobsController', function ($scope, Jobs) {
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
    //$scope.jobs = Jobs.fetchJobs();
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
  })
