'use strict'

function init() {
  addEventListeners()
  loadSavedMemes()
  const imgs = getImgs()
  renderGallery(imgs)
  renderSavedMemes()
  initStickers()
}

// Handlers

function handleImgChoice(imgId) {
  showEditor()
  imgChoice(imgId)
  handleCanvasRender()
  renderStickers()
  addEventListeners()
}

function handleMemeFromStorage(idx) {
  showEditor()
  setCurrMemeFromStorage(idx)
  handleCanvasRender()
  renderStickers()
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
  const selectedObjects = getSelectedObjects()
  const stickers = getAddedStickers()
  renderCanvas(img, txtLines, selectedObjects, stickers)
}

function handleSurpriseMeme() {
  handleImgChoice('surprise')
}

function handleSaveMeme() {
  saveMeme()
  renderSavedMemes()
}

function handleSearch(input) {
  if (!input) {
    const imgs = getImgs()
    renderGallery(imgs)
    return
  }
  const memesToRender = getRenderedImgs(input)
  renderGallery(memesToRender)
}

function handleSlideStickers(dir) {
  slideStickers(dir)
  renderStickers()
}

function handleAddSticker(id) {
  const sticker = getStickerById(id)
  addSticker(sticker)
  handleCanvasRender()
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

function renderGallery(imgs) {
  const elGallery = document.querySelector('.main-gallery')

  if (!imgs || imgs.length === 0) {
    elGallery.innerHTML = '<span>There are no images available</span>'
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

function renderStickers() {
  const elStickers = document.querySelector('.stickers-container .stickers')
  const stickers = getStickersToDisplay()
  let strHTML = stickers
    .map((sticker) => {
      return `<img src="${sticker.url}" onclick="handleAddSticker(${sticker.id})" />`
    })
    .join('')

  elStickers.innerHTML = strHTML
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
  const selectedLineIdx = selectLine(ev)
  if (selectedLineIdx >= 0) {
    setSelectedLine(selectedLineIdx)
    document.querySelector('.text-line input').value = getLineText()
    startDragging(ev)
    handleCanvasRender()
  } else {
    const selectedStickerIdx = selectSticker(ev)
    if (selectedStickerIdx >= 0) setSelectedSticker(selectedStickerIdx)
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

// Download/Upload

function handleDownloadMeme(elLink) {
  const data = gElCanvas.toDataURL()
  console.log(data)
  elLink.href = data
  elLink.download = 'my-meme'
}

function handleUploadImg() {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    document.querySelector(
      '.user-msg'
    ).innerText = `Your photo is available here: ${uploadedImgUrl}`

    document.querySelector('.share-container').innerHTML += `
          <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
             Share   
          </a>`
  }
  doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      console.log('Got back live url:', url)
      onSuccess(url)
    })
    .catch((err) => {
      console.error(err)
    })
}

// MISC

function prevent(ev) {
  ev.preventDefault()
}
