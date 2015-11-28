angular.module('lancealot.tasks', [])

  .controller('TasksController', function ($scope, $routeParams, Tasks, Clients) {
    $scope.tasks = [];

    $scope.openTask = false;

    $scope.totalBillable = 0;

    $scope.startTime;

    $scope.endTask = function(task) {
      Tasks.endTask(task)
        .then(function () {
          console.log(task);
        })
        .then($scope.fetchTasks);
      $scope.openTask = false;
      // $scope.currentTime = "00:00";
      // clearInterval($scope.timer);
    };

    $scope.fetchTasks = function() {
      Tasks.fetchTasks($routeParams.jobId)
        .then(function (tasks) {
          $scope.tasks = [];
          for (var i=0; i<tasks.length; i++) {
            tasks[i].pStart = $scope.convertTime(tasks[i].start);
            tasks[i].pEnd = $scope.convertTime(tasks[i].end);
            tasks[i].totalTime = $scope.totalTime(tasks[i]);
            tasks[i].rate = tasks[i].job.rate;
            if (tasks[i].totalTime) {
              $scope.totalBillable += tasks[i].totalTime * tasks[i].rate;
            }
            $scope.tasks.unshift(tasks[i]);
          }
        });
    };

    $scope.totalTime = function (task) {
      var start = new Date(task.start);
      var end = new Date(task.end);
      var totalTime = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      return Math.round(totalTime * 100) / 100;
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
