angular.module('lancealot.tasks', [])

  .controller('TasksController', function ($scope, $routeParams, $window, Tasks, Clients) {
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

    $scope.setClient = function (id) {
      Clients.fetchOne(id)
        .then(function (client){
          $scope.client = client[0];
        });
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
          //call method to correctly set the current client
          $scope.setClient($scope.tasks[0].job.client);
        });
    };

    $scope.editTask = function(task) {
      Tasks.setEditingTask(task);
      $window.location = "/#/tasks/" + task._id;
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

    $scope.createPDF = function () {
      var doc = new PDFDocument();
      var stream = doc.pipe(blobStream());

      doc.text('Name: ' + $scope.client.name);
      doc.text('Address: ' + $scope.client.address);
      doc.text('Phone: ' + $scope.client.phone);

      doc
        .moveDown()
        .text('Job: ' + $scope.tasks[0].job.description);
      doc.text('Rate: ' + $scope.tasks[0].rate + '/hr');

      $scope.tasks.forEach(function (task) {
        doc
          .moveDown()
          .text('Task: ' + task.name);
        doc.text('Hours Worked: ' + task.totalTime);
        doc.text('Total Cost: ' + task.totalTime * task.rate);
      })

      doc.end();
      stream.on('finish', function () {
        var url = stream.toBlobURL('application/pdf');
        window.open(url);
      });
    };

  })


  .factory('Tasks', function ($http) {

    var editingTask = undefined;

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

    var updateTask = function (task, jobId) {

      task.job = jobId;

      return $http({
        method: 'PUT',
        url: '/tasks',
        data: task
      }).then(function (res) {
        return;
      });
    };

    var setEditingTask = function (task) {
      editingTask = task;
    };

    var getEditingTask = function () {
      console.log(editingTask);
      return editingTask;
    };

    return {
      fetchTasks: fetchTasks,
      addTask: addTask,
      endTask: endTask,
      updateTask: updateTask,
      getEditingTask: getEditingTask,
      setEditingTask: setEditingTask
    };
  })
