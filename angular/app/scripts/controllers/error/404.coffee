'use strict'

angular.module('mobileApp')
  .controller('ErrorCtrl', ['$scope', '$rootScope', 'urlParamsService', ($scope, $rootScope, urlParamsService) ->

    $scope.headerBuscaSubmit = (query) ->
      $rootScope.$state.go 'busca',
        params: urlParamsService.busca.serialize
          query: query

  ])