'use strict'

function init() {
  addEventListeners()
  loadSavedMemes()
  renderSavedMemes()
}

function handleImgChoice(imgId) {
  showEditor()
  imgChoice(imgId)
  handleCanvasRender()
  addEventListeners()
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

function handleAddLine() {
  addLine()
  handleCanvasRender()
  document.querySelector('.text-line input').value = getLineText()
}

function handleSwitchLines() {
  switchLines()
  handleCanvasRender()
  document.querySelector('.text-line input').value = getLineText()
}

function handleDeleteLine() {
  deleteLine()
  switchLines()
  handleCanvasRender()
}

function handleCanvasRender() {
  const img = getSelectedImg()
  const txtLines = getTxtLines()
  const selectedLineIdx = getSelectedLineIdx()
  renderCanvas(img, txtLines, selectedLineIdx)
}

function handleSurpriseMeme() {
  handleImgChoice('surprise')
}

function handleSaveMeme() {
  saveMeme()
}

// Display

function showGallery() {
  document.querySelector('.gallery').classList.remove('hidden')
  document.querySelector('.editor').classList.add('hidden')
}

function showEditor() {
  document.querySelector('.gallery').classList.add('hidden')
  document.querySelector('.editor').classList.remove('hidden')
}

function renderSavedMemes() {
  const memes = getSavedMemes()
  console.log(memes)
  let strHTML = ''
  const elements = memes.map((meme, idx) => {
    return `<img onclick="handleImgChoice(${meme.selectedImgId})" src="img/${meme.selectedImgId}.jpg" alt="saved img number ${idx}" />`
  })

  strHTML += elements.join('')

  document.querySelector('.my-memes .gallery').innerHTML = strHTML
}

// Event Listeners

function addEventListeners() {
  addMouseListeners()
  addTouchListeners()
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', handleDragObject)
  gElCanvas.addEventListener('mousedown', handelSelectObject)
  gElCanvas.addEventListener('mouseup', handleStopDraging)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', handleDragObject)
  gElCanvas.addEventListener('touchstart', handelSelectObject)
  gElCanvas.addEventListener('touchend', handleStopDraging)
}

function handelSelectObject(ev) {
  const idx = selectObject(ev)
  if (idx >= 0) {
    setSelectedLine(idx)
    document.querySelector('.text-line input').value = getLineText()
    startDragging(ev)
    handleCanvasRender()
  }
}

function handleDragObject(ev) {
  dragObject(ev)
  handleCanvasRender()
}

function handleStopDraging() {
  stopDragging()
}
