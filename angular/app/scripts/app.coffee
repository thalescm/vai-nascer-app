'use strict'

angular.module('mobileApp')
  # .controller 'AppCtrl', ['$scope', '$window', '$timeout', 'taskExecutionQueueService', ($scope, $window, $timeout, taskExecutionQueueService) ->
    .config ($routeProvider) ->
        $routeProvider
          .when '/',
            templateUrl: 'views/main.html'
            controller: 'MainCtrl'
    # $scope.model = {
    #   openLeft: "closed"
    #   openRight: "closed"
    # }

    # $scope.abreProduto = () ->
    #   $scope.$state.transitionTo('produto', {id: '123'});

    # $scope.abreDepartamento = () ->
    #   $scope.$state.transitionTo('index.departamento', {departamento_id: '2'});

    # $scope.abrePerfil = () ->
    #   $scope.$state.transitionTo('perfil');

    # $scope.openLeftMenu = () ->
    #   $scope.model.openLeft = "open"

  # ]
