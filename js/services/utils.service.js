'use strict'

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft,
      y: ev.pageY - ev.target.offsetTop * 3,
    }
  }
  return pos
}

function getDist(point1, point2) {
  return {
    x: point2.x - point1.x,
    y: point2.y - point1.y,
  }
}
