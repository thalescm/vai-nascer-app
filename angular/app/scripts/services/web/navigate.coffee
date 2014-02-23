'use strict'

class NavigateService extends Navigate

  constructor: (@$location, @defaults) ->
    super

  newTab: (url) ->
    window.open url, '_blank'

  toLogin: (fromUrl) ->
    loginPath = @_getPathLogin()
    if fromUrl and fromUrl?
      # has to be encoded, otherwise it will be trimmed to '{protocol}://{host}:{gate}/' by the browser
      loginPath = loginPath + "?fromUrl=" + @encodeURL(fromUrl)
    @to loginPath

  toPerfil: () ->
    @to @defaults.paths.perfil

  toPagamento: () ->
    @to @defaults.paths.pagamento

  toPedidos: () ->
    @to @defaults.paths.pedidos

  toCarrinho: () ->
    @to @defaults.paths.carrinho

  toHome: () ->
    @to @defaults.paths.home

  toMap: () ->
    msg = "Operation only supported on native apps running Cordova."
    # application compliant error (has message property) 
    error = new Error(msg)
    error.message = msg
    throw error

  _getPathLogin: () ->
    return @defaults.paths.login

angular.module('app.services').provider 'navigateService', () ->
  service =
    defaults:
      paths:
        home: ''
        carrinho: ''
        perfil: ''
        pagamento: ''
        pedidos: ''
        images: ''
    $get: ['$location', ($location) ->
      new NavigateService($location, service.defaults)
    ]
  return service