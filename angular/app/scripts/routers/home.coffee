angular.module('mobileApp')
  .config(['$stateProvider', ($stateProvider) ->

    $stateProvider
      .state 'home',
        url: '/home'
        metadata:
          canonical: 'home'
        views:
          'content':
            templateUrl: 'views/pages/home/main.html'
            controller: 'AppCtrl'

  ])
