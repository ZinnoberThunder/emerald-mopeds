angular.module('lancealot.tasks', [])

  .controller('TasksController', function ($scope, $routeParams, Tasks) {
    $scope.tasks = [];

    $scope.addTask = function (task) {
      
      Tasks.addTask(task, $routeParams.jobId)
        .then(function () {
          Tasks.fetchTasks($routeParams.jobId)
            .then(function (tasks) {
              $scope.tasks = tasks;
            });
        });

      $scope.task = {};

    };

    Tasks.fetchTasks($routeParams.jobId)
      .then(function (tasks) {
        $scope.tasks = tasks;
      });
  })

  .factory('Tasks', function ($http) {

    var fetchTasks = function (id) {
      return $http({
        method: 'GET', 
        url: '/jobs/' + id
      }).then(function (res) {
        return res.data;
      });
    };

    var addTask = function (task, jobId) {

      task.job = jobId;

      return $http({
        method: 'POST',
        url: '/tasks',
        data: task
      }).then(function (res) {
        return;
      });
    };

    return {
      fetchTasks: fetchTasks,
      addTask: addTask
    };
  })
