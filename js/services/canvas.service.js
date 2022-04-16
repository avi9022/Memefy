'use strict'
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')

function renderCanvas(elImg, lines, selectedObjectIdx, stickers) {
  gElCanvas.height = (gElCanvas.width * elImg.height) / elImg.width

  // Background image
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

  lines.forEach((line, idx) => {
    if (line.isEditing) return
    const isSelected = idx === selectedObjectIdx.line
    renderTxtLine(line, isSelected)
  })

  stickers.forEach((sticker, idx) => {
    const isSelected = idx === selectedObjectIdx.sticker
    renderSticker(sticker, isSelected)
  })
}

function renderTxtLine(line, isSelected) {
  const { txt, size, align, isBold, font, color, pos } = line
  gCtx.font = isBold ? `bold ${size}px ${font}` : `${size}px ${font}`
  line.width = gCtx.measureText(txt).width
  if (isSelected) {
    // Rect that indicates selection
    gCtx.fillStyle = 'white'
    gCtx.fillRect(pos.x - 5, pos.y - size / 2, line.width + 10, size)

    // Circles to show resize option
    gCtx.fillStyle = 'lightblue'
    gCtx.beginPath()
    gCtx.arc(pos.x + line.width + 5, pos.y + size / 2, 5, 0, 2 * Math.PI)
    gCtx.fill()
    gCtx.closePath()
  }
  gCtx.textBaseline = 'middle'
  gCtx.fillStyle = color
  gCtx.textAlign = align
  gCtx.fillText(txt, pos.x, pos.y)
}

function renderSticker({ pos, url, width, height }, isSelected) {
  const elSticker = new Image()
  elSticker.src = url
  if (isSelected) {
    // Stroke to indicate selection
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = '5'
    gCtx.strokeRect(pos.x - 5, pos.y - 5, width + 5, height + 10)

    // Circles to show resize option
    gCtx.fillStyle = 'lightblue'
    gCtx.beginPath()
    gCtx.arc(pos.x - 5, pos.y - 5, 10, 0, 2 * Math.PI)
    gCtx.fill()
    gCtx.closePath()

    gCtx.beginPath()
    gCtx.arc(pos.x + width, pos.y - 5, 10, 0, 2 * Math.PI)
    gCtx.fill()
    gCtx.closePath()

    gCtx.beginPath()
    gCtx.arc(pos.x + width, pos.y + 5 + height, 10, 0, 2 * Math.PI)
    gCtx.fill()
    gCtx.closePath()

    gCtx.beginPath()
    gCtx.arc(pos.x - 5, pos.y + 5 + height, 10, 0, 2 * Math.PI)
    gCtx.fill()
    gCtx.closePath()
  }

  gCtx.drawImage(elSticker, pos.x, pos.y, width, height)
}

function getCanvasHeight() {
  return gElCanvas.height
}

function updateLineWidth(line) {
  gCtx.font = gCtx.font = line.isBold
    ? `bold ${line.size}px ${line.font}`
    : `${line.size}px ${line.font}`
  line.width = gCtx.measureText(line.txt).width
}

function updateCnavasWidth() {
  if (innerWidth <= 400) gElCanvas.width = innerWidth
  else gElCanvas.width = 400
}
