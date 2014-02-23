# Cordova plugins
'use strict'

class AngularNativeMediator

  constructor: () ->

  openMap: (stores, callback = null) ->
    if !Cordova?
      callback "error"
      return

    if callback?
      callback = (message) ->
        if message?
          console.log "Callback Success!"
        else
          console.log message

    Cordova.exec callback, ( (msg) ->
      callback msg if callback
    ), "AngularNativeMediator", "openMap", [stores]

  openUrl: (url, callback = null) ->
    if !Cordova?
      callback "error"
      return

    if callback?
      callback = (message) ->
        if message?
          console.log "Callback Success!"
        else
          console.log message

    Cordova.exec callback, ( (msg) ->
      callback msg if callback
    ), "AngularNativeMediator", "openUrl", [url]

angular.module('app.services').service 'angularNativeMediatorService', ['cookieService', '$rootScope', AngularNativeMediator]

