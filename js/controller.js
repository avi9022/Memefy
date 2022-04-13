'use strict'

function init() {
  addEventListeners()
  loadSavedMemes()
  renderGallery()
  renderSavedMemes()
}

function handleImgChoice(imgId) {
  showEditor()
  imgChoice(imgId)
  handleCanvasRender()
  addEventListeners()
}

function handleMemeFromStorage(idx) {
  showEditor()
  setCurrMemeFromStorage(idx)
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
  renderSavedMemes()
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

function renderGallery() {
  const imgs = getImgs()
  const elGallery = document.querySelector('.main-gallery')

  if (!imgs || imgs.length === 0) {
    elMyMemes.innerHTML = '<span>There are no images available</span>'
    return
  }
  let strHTML = ''
  const elements = imgs.map((img, idx) => {
    return `<img onclick="handleImgChoice(${img.id})" src="${img.url}" alt="image number ${idx}" />`
  })

  strHTML += elements.join('')
  strHTML += `        <button class="btn surprise-btn" onclick="handleSurpriseMeme()">
  Surprise Me!
</button>`

  elGallery.innerHTML = strHTML
}

function renderSavedMemes() {
  const memes = getSavedMemes()
  const elMyMemes = document.querySelector('.my-memes .gallery')

  if (!memes || memes.length === 0) {
    elMyMemes.innerHTML = '<span class="no-memes">You have no memes????</span>'
    return
  }
  let strHTML = ''
  const elements = memes.map((meme, idx) => {
    return `<img onclick="handleMemeFromStorage(${idx})" src="img/${meme.selectedImgId}.jpg" alt="saved img number ${idx}" />`
  })

  strHTML += elements.join('')

  elMyMemes.innerHTML = strHTML
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
