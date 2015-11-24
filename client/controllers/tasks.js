angular.module('lancealot.tasks', [])

  .controller('TasksController', function ($scope, $routeParams, Tasks) {
    $scope.tasks = [];

    $scope.openTask = false;

    $scope.startTime;

    $scope.endTask = function(task) {
      Tasks.endTask(task).then($scope.fetchTasks);
      $scope.openTask = false;
      // $scope.currentTime = "00:00";
      // clearInterval($scope.timer);
    };

    $scope.fetchTasks = function() {
      Tasks.fetchTasks($routeParams.jobId)
        .then(function (tasks) {
          $scope.tasks = [];
          for (var i=0; i<tasks.length; i++) {
            tasks[i].start = $scope.convertTime(tasks[i].start);
            tasks[i].end = $scope.convertTime(tasks[i].end);
            $scope.tasks.unshift(tasks[i]);
          }
        });
    };

    $scope.convertTime = function(time) {
      var time = new Date(time);
      return time.toString().slice(4).slice(0,-18);
    };

    // $scope.timer = setInterval(
    //   function(){
    //     console.log("running");
    //     var time = (-($scope.startTime - Date.now()) / 1000);
    //     var hours = Math.floor(time / 60 / 60);
    //     var minutes = Math.floor(time / 60);
    //     if (hours < 10) {
    //       hours = "0" + hours
    //     }
    //     if (minutes < 10) {
    //       minutes = "0" + minutes
    //     }
    //     $scope.currentTime = hours + ":" + minutes;
    //     $scope.$apply();
    //   },10000);

    $scope.addTask = function (task) {
      Tasks.addTask(task, $routeParams.jobId)
        .then(function () {
          $scope.startTime = Date.now()
          $scope.fetchTasks();
          $scope.openTask = true;
        });
      $scope.task = {};
    };
    $scope.fetchTasks();
    // $scope.timer;
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
