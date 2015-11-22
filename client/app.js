angular.module('lancealot', [
  'lancealot.jobs',
  'lancealot.tasks',
  'lancealot.clients',
  'lancealot.auth',
  'lancealot.nav',
  'lancealot.signup',
  'lancealot.login',
  'ngRoute'])

  .config(function ($routeProvider, $httpProvider) {

    $routeProvider
      .when('/', {
        templateUrl: './views/jobs.html',
        controller: 'JobsController',
        authenticate: true
      })
      .when('/addjob', {
        templateUrl: './views/addJob.html',
        controller: 'AddJobsController',
        authenticate: true
      })
      .when('/clients', {
        templateUrl: './views/clients.html',
        controller: 'ClientsController',
        authenticate: true
      })
      .when('/addclient', {
        templateUrl: './views/addClient.html',
        controller: 'AddClientsController',
        authenticate: true
      })
      .when('/jobs/:jobId', {
        templateUrl: './views/tasks.html',
        controller: 'TasksController',
        authenticate: true
      })
      .when('/login', {
        templateUrl: './views/login.html',
        controller: 'LoginController'
      })
      .when('/signup', {
        templateUrl: './views/signup.html',
        controller: 'SignupController'
      })
      .otherwise({
        templateUrl: './views/splash.html'
      });

    $httpProvider.interceptors.push('AttachTokens');

  })
  .factory('AttachTokens', function ($window) {
    // this is an $httpInterceptor
    // its job is to stop all out going request
    // then look in local storage and find the user's token
    // then add it to the header so the server can validate the request
    var attach = {
      request: function (object) {
        var jwt = $window.localStorage.getItem('token');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  })
  .run(function ($rootScope, $location, Auth) {
    // here inside the run phase of angular, our services and controllers
    // have just been registered and our app is ready
    // however, we want to make sure the user is authorized
    // we listen for when angular is trying to change routes
    // when it does change routes, we then look for the token in localstorage
    // and send that token to the server to see if it is a real user or hasn't expired
    // if it's not valid, we then redirect back to signin/signup
    $rootScope.$on('$routeChangeStart', function (evt, next, current) {
      if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
        $location.path('/splash');
      }
    });
  });


// app.factory('Tasks', function ($http){
//   var fetchTasks = function (id) {
//     $http({
//       method: 'GET',
//       url: '/jobs/' + id
//     }).then(function (res){
//       return res.data;
//     });
//   };

//   return {
//     fetchTasks: fetchTasks
//   };
// });

// app.factory('Clients', function ($http){
//   var fetchClients = function (){
//     $http({
//       method: 'GET',
//       url: '/clients'
//     }).then(function (res){
//       return res.data;
//     });
//   };

//   return {
//     fetchClients: fetchClients
//   };
// });
