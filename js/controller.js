'use strict'

function handleImgChoice(imgId) {
  showEditor()
  imgChoice(imgId)
  handleCanvasRender()
}

function handleTxtChange(val) {
  updateLineTxt(val)
  handleCanvasRender()
}

function handleTxtUp() {
  moveTxtLineUp()
  handleCanvasRender()
}

function handleTxtDown() {
  moveTxtLineDown()
  handleCanvasRender()
}

function handleFontIncrease() {
  increaseFont()
  handleCanvasRender()
}

function handleFontDecrease() {
  decreaseFont()
  handleCanvasRender()
}

function handleAlignment(val) {
  alignTxt(val)
  handleCanvasRender()
}

function handleFontChange(font) {
  changeFont(font)
  handleCanvasRender()
}

function handleBold() {
  toggleBoldTxt()
  handleCanvasRender()
}

function handleTxtColorChange(color) {
  changeFontColor(color)
  handleCanvasRender()
}

function handleCanvasRender() {
  const img = getSelectedImg()
  const txtLines = getTxtLines()
  renderCanvas(img, txtLines)
}

function showGallery() {
  document.querySelector('.gallery').classList.remove('hidden')
  document.querySelector('.editor').classList.add('hidden')
}

function showEditor() {
  document.querySelector('.gallery').classList.add('hidden')
  document.querySelector('.editor').classList.remove('hidden')
}
