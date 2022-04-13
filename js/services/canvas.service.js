'use strict'

const gElCanvas = document.querySelector('canvas')
const gCtx = gElCanvas.getContext('2d')

function renderCanvas({ url }, lines) {
  const elImg = new Image()
  elImg.src = url
  gElCanvas.height = (400 * elImg.height) / elImg.width

  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
  lines.forEach((line) => renderTxtLine(line))
}

function renderTxtLine({ txt, size, align, isBold, font, color, pos }) {
  console.log(isBold)
  gCtx.font = isBold ? `bold ${size}px ${font}` : `${size}px ${font}`
  gCtx.fillStyle = color
  gCtx.textAlign = align
  gCtx.fillText(txt, pos.x, pos.y)
}
