'use strict';

angular.module('angularCoffeeAppApp')
  .directive('stickman', () ->
    restrict: 'C',
    scope: true,
    # replace: true,

    controller: ($scope, $element, $attrs) ->
      console.log $scope
      $scope.moveMan = () ->
        console.log $scope
        $scope.moveMan = () ->
          $element.css('margin', '10px 0')


    ,link: (scope, element, attrs) ->
      # debugger
      w = 25;
      h = 50;
      canvas = element[0]
      if canvas.getContext
        context = canvas.getContext("2d")
        
        canvas.setAttribute("width", w)
        canvas.setAttribute("height", h)

        context.strokeStyle = "#000000"
        context.lineWidth = "2"

        # /* Draw head */
        context.arc(w/2, 3*h/16, h/16, 0, Math.PI*2, true)

        # /* Draw body */
        context.moveTo(w/2,  4*h/16)
        context.lineTo(w/2, 9*h/16)

        # /*Draw left arm */
        context.moveTo((w/2), 5*h/16)
        context.lineTo((w/2)-(3*h/16) , 8*h/16)

        # /*Draw right arm */
        context.moveTo((w/2), 5*h/16)
        context.lineTo((w/2)+(3*h/16) , 8*h/16)

        # /* Draw left leg */
        context.moveTo(w/2, 9*h/16)
        context.lineTo(w/2-(2.5*h/16), 14*h/16)

        # /* Draw right leg */
        context.moveTo(w/2 , 9*h/16)
        context.lineTo(w/2+(2.5*h/16), 14*h/16)

        context.stroke()
        context.fill()
  )
