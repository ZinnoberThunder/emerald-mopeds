angular.module('lancealot.clients', [])

  .controller('ClientsController', function ($scope, Clients) {
    $scope.clients = [{
      name: 'fb',
      address: 'somewhere',
      phone: 1
    }, {
      name: 'google',
      address: 'somewhere else',
      phone: 2
    }];

    $scope.addClient = function (client) {
      Clients.addClient(client)
        .then(function (client) {
          $scope.clients.push(client);
        });
    };

    Clients.fetchClients()
      .then(function (clients) {
        $scope.clients = clients;
      });

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
        console.log(res.data);
        return res.data;
      });
    };

    return {
      fetchClients: fetchClients,
      addClient: addClient
    };
  })
