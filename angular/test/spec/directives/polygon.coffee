'use strict'

describe 'Directive: polygon', () ->
  beforeEach module 'angularCoffeeAppApp'

  element = {}

  it 'should make hidden element visible', inject ($rootScope, $compile) ->
    element = angular.element '<polygon></polygon>'
    element = $compile(element) $rootScope
    expect(element.text()).toBe 'this is the polygon directive'
