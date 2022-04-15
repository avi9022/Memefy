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
      y: ev.pageY - ev.target.offsetParent.offsetTop,
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

function getDistAbs(point1, point2) {
  return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2)
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor((max - min + 1) * Math.random() + min)
}

function getRandomColor() {
  var red = getRandomInt(0, 255)
  var green = getRandomInt(0, 255)
  var blue = getRandomInt(0, 255)
  return `rgb(${red},${green},${blue})`
}

function getRandomColorHex() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16)
  return '#' + randomColor
}

function makeId(length = 5) {
  var txt = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}
