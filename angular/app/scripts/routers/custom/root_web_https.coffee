angular.module('mobileApp')
  .config(['$urlRouterProvider', ($urlRouterProvider) ->

    $urlRouterProvider
      .when('/', '/pagamento-endereco')
      .when('', '/pagamento-endereco')
      .otherwise('/error-404');
  ])