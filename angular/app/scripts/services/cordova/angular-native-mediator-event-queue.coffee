window.AngularNativeMediatorEventQueue = new class

  constructor: (params = {}) ->
    @_tasks = []

  push: (name, args = []) ->

    task =
      name: name
      # http://stackoverflow.com/questions/4775722/javascript-check-if-object-is-array
      args: if Object.prototype.toString.call(args) is '[object Array]' then args else [args]
    @_tasks.push task

    # Fires event to say that an item has been added to the queue.
    # It maintains an internal queue so that it does not have to entirely depends on the event being captured,
    # and angular might not be loaded and/or event binders might not be been registered yet

    # https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Events/Creating_and_triggering_events
    ev = new CustomEvent 'angularNativeMediatorEventQueuePush',
      task: task
    document.dispatchEvent ev

  pop: () ->
    return @_tasks.pop()