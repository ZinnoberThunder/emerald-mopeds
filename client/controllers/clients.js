angular.module('lancealot.clients', [])

  .controller('ClientsController', function ($scope, Clients) {
    $scope.clients = [];

    Clients.fetchClients()
      .then(function (clients) {
        $scope.clients = clients;
      });

  })

  .controller('AddClientsController', function ($scope, $location, Clients) {
    $scope.clients = [];

    $scope.addClient = function (client) {
      Clients.addClient(client)
        .then(function (client) {
          $scope.clients.push(client);
          $location.path('/clients');
        });
      $scope.client = {};
    };
  })

  .factory('Clients', function ($http) {

    var fetchClients = function () {
      return $http({
        method: 'GET', 
        url: '/clients'
      }).then(function (res) {
        return res.data;
      });
    };

    var addClient = function (client) {
      return $http({
        method: 'POST',
        url: '/clients',
        data: client
      }).then(function (res) {
        return res.data;
      });
    };

    return {
      fetchClients: fetchClients,
      addClient: addClient
    };
  })
