'use strict'
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')

function renderCanvas({ url }, lines, selectedLineIdx) {
  const elImg = new Image()
  elImg.src = url
  gElCanvas.height = (400 * elImg.height) / elImg.width

  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
  lines.forEach((line, id) => {
    const isSelected = id === selectedLineIdx
    renderTxtLine(line, isSelected)
  })
}

function renderTxtLine(line, isSelected) {
  const { txt, size, align, isBold, font, color, pos } = line
  gCtx.font = isBold ? `bold ${size}px ${font}` : `${size}px ${font}`
  line.width = gCtx.measureText(txt).width
  if (isSelected) {
    gCtx.fillStyle = 'white'
    gCtx.fillRect(pos.x - 5, pos.y - size, line.width + 10, size + 10)
  }
  gCtx.fillStyle = color
  gCtx.textAlign = align
  gCtx.fillText(txt, pos.x, pos.y)
}

function selectObject(ev) {
  const mousePos = getEvPos(ev)
  const lines = getTxtLines()
  return lines.findIndex((line) => checkLineSelection(line, mousePos))
}

function checkLineSelection({ pos, width, size }, mousePos) {
  return (
    mousePos.x >= pos.x &&
    mousePos.x <= pos.x + width &&
    mousePos.y <= pos.y &&
    mousePos.y >= pos.y - size
  )
}
