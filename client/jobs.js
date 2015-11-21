angular.module('lancealot.jobs', [])

  .controller('JobsController', function ($scope, Jobs) {
    $scope.jobs = ['test', 'another job'];
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
