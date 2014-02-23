'use strict'

class NavigateService extends Navigate

  constructor: (@$location, @$state, @angularNativeMediatorService) ->
    super

  newTab: (url) ->
    @angularNativeMediatorService.openUrl(url)
    return true

  toLogin: (fromUrl) ->
    loginPath = @_getPathLogin()
    if fromUrl and fromUrl?
      # has to be encoded, otherwise it will be trimmed to '{protocol}://{host}:{gate}/' by the browser
      loginPath = loginPath + "?fromUrl=" + @encodeURL(fromUrl)
    @to "#!#{loginPath.slice(1)}"
  
  toPerfil: () ->
    @$state.transitionTo 'perfil'

  toPagamento: () ->
    @$state.transitionTo 'endereco'

  toPedidos: () ->
    @$state.transitionTo 'pedidos'

  toCarrinho: () ->
    @$state.transitionTo 'home.carrinho'

  toHome: () ->
    @$state.transitionTo 'home'

  toMap: (stores)->
    @angularNativeMediatorService.openMap(stores)

  _getPathLogin: () ->
    return @$state.href('login')

angular.module('app.services').service 'navigateService', ['$location', '$state', 'angularNativeMediatorService', NavigateService]


