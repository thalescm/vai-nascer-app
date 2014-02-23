angular.module('mobileApp')
  .config(['$stateProvider', ($stateProvider) ->

    $stateProvider
      .state '404',
        url: '/error-404'
        views:
          'content':
            templateUrl: 'views/pages/error/404.html'
            controller: 'ErrorCtrl'
  ])