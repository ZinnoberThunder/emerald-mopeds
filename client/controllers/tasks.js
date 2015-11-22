angular.module('lancealot.tasks', [])

  .controller('TasksController', function ($scope, $routeParams, Tasks) {
    $scope.tasks = [];

    $scope.openTask = false;

    $scope.endTask = function(task) {
      console.log(task);
      Tasks.endTask(task).then($scope.fetchTasks);
      $scope.openTask = false;
    };

    $scope.fetchTasks = function() {
      Tasks.fetchTasks($routeParams.jobId)
        .then(function (tasks) {
          $scope.tasks = tasks;
        });
    }

    $scope.addTask = function (task) {
      
      Tasks.addTask(task, $routeParams.jobId)
        .then(function () {
          $scope.fetchTasks();
          $scope.openTask = true;
        });
      $scope.task = {};
    };
    $scope.fetchTasks()
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


    var endTask = function(task) {
      return $http({
        method: 'POST',
        url: '/tasks/' + task._id
      }).then(function(res){
        return res.data;
      })
    }

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
      addTask: addTask,
      endTask: endTask
    };
  })
