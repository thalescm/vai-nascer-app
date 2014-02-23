angular.module('mobileApp')
  .config(['$urlRouterProvider', ($urlRouterProvider) ->

    $urlRouterProvider
      .when('/', '/home')
      .when('', '/home')
      .when('/index.html', '/home')
      .otherwise('/error-404');
  ])