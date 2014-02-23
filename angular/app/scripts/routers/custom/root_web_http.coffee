angular.module('mobileApp')
  .config(['$urlRouterProvider', ($urlRouterProvider) ->

    $urlRouterProvider
      .when('/', '/home')
      .when('', '/home')
      .otherwise('/error-404');
  ])