// add a function dashedLineTo to CanvasRenderingContext2D.prototype
(function () {
  /* global CanvasRenderingContext2D */
  var moveToFunction = CanvasRenderingContext2D.prototype.moveTo

  // obj to record the last point location
  CanvasRenderingContext2D.prototype.lastMoveToLocation = {}
  // rewrite moveTo to record the last point location
  CanvasRenderingContext2D.prototype.moveTo = function (x, y) {
    // this point to current context obj
    moveToFunction.apply(this, [x, y])
    this.lastMoveToLocation.x = x
    this.lastMoveToLocation.y = y
  }
  CanvasRenderingContext2D.prototype.dashedLineTo = function (x, y, dashLength) {
    dashLength = dashLength || 5
    dashLength = dashLength < 0 || 5
    var startX, startY, deltaX, deltaY, numDeshes
    startX = this.lastMoveToLocation.x
    startY = this.lastMoveToLocation.y
    deltaX = x - startX
    deltaY = y - startY
    numDeshes = Math.floor(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / dashLength)
    for (var i = 0; i < numDeshes; i++) {
      this[i % 2 === 0 ? 'moveTo' : 'lineTo'](startX + (deltaX / numDeshes) * i, startY + (deltaY / numDeshes) * i)
    }
    // case of odd num
    this.moveTo(x, y)
  }
})()

// module.exports=CanvasRenderingContext2D
export {CanvasRenderingContext2D}
