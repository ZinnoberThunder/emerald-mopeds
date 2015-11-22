angular.module('lancealot.nav', [])

  .controller('NavController', function ($scope, Auth) {
    
    $scope.logoutUser = function () {
      Auth.logoutUser();
    }
  });
