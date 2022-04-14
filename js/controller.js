'use strict'

function init() {
  addEventListeners()
  loadSavedMemes()
  const imgs = getImgs()
  renderGallery(imgs)
  renderSavedMemes()
  initSearchKeyWords(imgs)
  renderKeyWords()
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

function handleCustomMeme() {
  showEditor()
  setCurrMemeCustom()
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
  enableTools()
  handleCanvasRender()
  document.querySelector('.text-line input').value = getLineText()
}

function handleSwitchLines() {
  switchLines()
  handleCanvasRender()
  document.querySelector('.text-line input').value = getLineText()
}

function handleDelete() {
  deleteObject()
  // switchLines()
  handleCanvasRender()
}

function handleCanvasRender(elImg) {
  const txtLines = getTxtLines()
  const selectedObjects = getSelectedObjects()
  const stickers = getAddedStickers()

  // If elImg passed as args than it is an uploaded img
  if (getIsCustom()) elImg = getCustomImgTag()
  else if (!elImg) {
    const img = getSelectedImg()
    elImg = new Image()
    elImg.src = img.url
  }
  renderCanvas(elImg, txtLines, selectedObjects, stickers)
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
  strHTML += `<button class="btn surprise-btn" onclick="handleSurpriseMeme()">
              Surprise Me!
              </button>
              <input type="file" class="file-input btn" name="image" onchange="handleImgInput(event)" />`

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
    const imgUrl = getImgById(meme.selectedImgId).url
    console.log(imgUrl)
    return `<img onclick="handleMemeFromStorage(${idx})" src="${imgUrl}" alt="saved img number ${idx}" />`
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

function renderKeyWords() {
  const elKeyWordContainer = document.querySelector(
    '.popular-word-container .words'
  )
  const keyWords = Array.from(getKeyWords())
  let strHTML = keyWords
    .map((keyWord) => `<span class="word">${keyWord}</span>`)
    .join('')

  elKeyWordContainer.innerHTML = strHTML
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
    enableTools()
    handleCanvasRender()
    return
  }
  const selectedStickerIdx = selectSticker(ev)
  if (selectedStickerIdx >= 0) {
    setSelectedSticker(selectedStickerIdx)
    startDragging(ev)
    handleCanvasRender()
    return
  }

  deselectAll()
  disableTools()
  handleCanvasRender()
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

function handleImgInput(ev) {
  console.log('in')
  handleCustomMeme()
  loadImageFromInput(ev, handleCanvasRender)
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader()

  reader.onload = (event) => {
    var img = new Image()
    // Render on canvas
    img.src = event.target.result
    img.onload = onImageReady.bind(null, img)
    setCustomImgTag(img)
  }
  reader.readAsDataURL(ev.target.files[0])
}

// MISC

function prevent(ev) {
  ev.preventDefault()
}

function disableTools() {
  document.querySelector('.tools .text-line input').disabled = true
  document
    .querySelectorAll('.tools-btn-container .btn-tools')
    .forEach((btn) => {
      btn.disabled = true
      if (btn.classList.contains('plus-btn')) btn.disabled = false
    })
}

function enableTools() {
  document.querySelector('.tools .text-line input').disabled = false
  document
    .querySelectorAll('.tools-btn-container .btn-tools')
    .forEach((btn) => {
      btn.disabled = false
    })
}
