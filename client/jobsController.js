angular.module('lancealot.jobs', [])

  .controller('JobsController', function ($scope, Jobs) {
    $scope.jobs = ['test', 'another job'];
    $scope.jobs = Jobs.fetchJobs();
  });
