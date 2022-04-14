'use strict'
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')

function renderCanvas(elImg, lines, selectedObjectIdx, stickers) {
  gElCanvas.height = (400 * elImg.height) / elImg.width

  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
  lines.forEach((line, idx) => {
    if (line.isEditing) return
    const isSelected = idx === selectedObjectIdx.line
    renderTxtLine(line, isSelected)
  })

  stickers.forEach((sticker, idx) => {
    const elSticker = new Image()
    elSticker.src = sticker.url
    if (idx === selectedObjectIdx.sticker) {
      gCtx.strokeStyle = 'white'
      gCtx.lineWidth = '5'
      gCtx.strokeRect(
        sticker.pos.x - 5,
        sticker.pos.y - 5,
        sticker.width + 5,
        sticker.height + 10
      )
    }
    gCtx.drawImage(elSticker, sticker.pos.x, sticker.pos.y, 100, 100)
  })
}

function renderTxtLine(line, isSelected) {
  const { txt, size, align, isBold, font, color, pos } = line
  gCtx.font = isBold ? `bold ${size}px ${font}` : `${size}px ${font}`
  line.width = gCtx.measureText(txt).width
  if (isSelected) {
    // Rect that indicates selection
    gCtx.fillStyle = 'white'
    gCtx.fillRect(pos.x - 10, pos.y - size, line.width + 15, size + 10)

    // Circles to show resize option
    gCtx.fillStyle = 'lightblue'
    gCtx.beginPath()
    gCtx.arc(pos.x + line.width + 4, pos.y + 7, 5, 0, 2 * Math.PI)
    gCtx.fill()
    gCtx.closePath()
  }
  gCtx.fillStyle = color
  gCtx.textAlign = align
  gCtx.fillText(txt, pos.x, pos.y)
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
