'use strict'

class AngularNativeMediatorEventExecutor

  constructor: (@$window, @navigate) ->
    # does not call execute task as it is needs to clear the tasks queue
    document.addEventListener 'angularNativeMediatorEventQueuePush', () =>
      @execute()

  execute: () ->
    while task = @$window.AngularNativeMediatorEventQueue.pop()
      @executeTask task

  executeTask: (task) ->
    if task.name == 'navigate' && task.args?.length > 0
      @navigate.to task.args[0]

angular.module('app.services').service 'angularNativeMediatorEventExecutorService', ['$window', 'navigateService', AngularNativeMediatorEventExecutor]

