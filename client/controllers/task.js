angular.module('lancealot.task', [])

  .controller('TaskController', function ($scope, $routeParams, $window, Tasks) {

    $scope.getEditingTask = function () {
      console.log('called')
      $scope.editingTask = Tasks.getEditingTask();
    };

    $scope.updateTask = function(task) {
      task.start.setHours(task.startTime.getHours());
      task.start.setMinutes(task.startTime.getMinutes());
      task.end.setHours(task.endTime.getHours());
      task.end.setMinutes(task.endTime.getMinutes());

      Tasks.updateTask(task, $routeParams.jobId)
      .then(function () {
        $scope.setEditingTask = undefined;
        $window.history.back();
      })
    };

    $scope.getDate = function (startOrEnd) {
      var date = new Date($scope.editingTask[startOrEnd]);
      return date.toJSON().slice(0, 10);
    };

    $scope.getEditingTask();
  })
