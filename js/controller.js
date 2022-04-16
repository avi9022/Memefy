'use strict'

function init() {
  addEventListeners()
  loadSavedMemes()
  const imgs = getImgs()
  renderGallery(imgs)
  renderSavedMemes()
  initSearchKeyWords(imgs)
  renderSearchData()
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

function handleMemeFromStorage(id) {
  showEditor()
  setCurrMemeFromStorage(id)
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
  if (getIsCustom()) {
    const img = getImgData()
    elImg = new Image()
    elImg.src = img
  } else if (!elImg) {
    const img = getSelectedImg()
    elImg = new Image()
    elImg.src = img.url
  }
  renderCanvas(elImg, txtLines, selectedObjects, stickers)

  // Making sure the container is the canvas size
  document.querySelector('.canvas-inner-container').style.height =
    getCanvasHeight() + 'px'
}

function handleSurpriseMeme() {
  handleImgChoice('surprise')
}

function handleSaveMeme() {
  handleUploadImg(true)
  setTimeout(() => {
    saveMeme()
    renderSavedMemes()
  }, 1000)
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

function handleIncreaseClickCount(word) {
  increaseClickCount(word)
  renderKeyWords()

  document.querySelector('.search form input').value = word
  document.querySelector('.search form input').focus()

  handleSearch(word)
}

function handleDeselectAll() {
  deselectAll()
  disableTools()
  document.querySelector('.text-edit-container').innerHTML = ''
  handleCanvasRender()
}

function handleInlineEdit(newTxt, lineIdx) {
  const line = getLineByIdx(lineIdx)
  line.txt = newTxt
  updateLineWidth(line)

  document.querySelector('.text-line input').value = newTxt
  document.querySelector('.text-edit-container input').style.width =
    line.width + 10 + 'px'
}

function handleDeleteMeme(id) {
  deleteMeme(id)
  renderSavedMemes()
}

// Display

function showGallery() {
  document.querySelector('.gallery').classList.remove('hidden')
  document.querySelector('.search').classList.remove('hidden')
  document.querySelector('.editor').classList.add('hidden')
}

function showEditor() {
  document.querySelector('.gallery').classList.add('hidden')
  document.querySelector('.search').classList.add('hidden')
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
              <input type="file" class="file-input btn" name="image" onchange="handleImgInput(event)" />
              `

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
  const elements = memes.map((meme) => {
    return `
      <div class="my-meme-container">
      <img onclick="handleMemeFromStorage('${meme.id}')" src=${meme.url} alt="saved meme" />
      <span class="delete-meme" onclick="handleDeleteMeme('${meme.id}')">X</span>
      </div>
      `
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
  const keyWords = getKeyWords()
  let strHTML = keyWords
    .map((keyWord) => {
      return `<span class="word" onclick="handleIncreaseClickCount('${
        keyWord.keyword
      }')" style="font-size:${1 + keyWord.clickCount / 10}rem">${
        keyWord.keyword
      }</span>`
    })
    .join('')

  elKeyWordContainer.innerHTML = strHTML
}

function toggleSearchHeight() {
  const elSearch = document.querySelector('.search .popular-word-container')
  if (elSearch.style.maxHeight === '100%') {
    elSearch.style.maxHeight = '40px'
  } else {
    elSearch.style.maxHeight = '100%'
  }
}

function renderTextArea({ txt, size, pos, font, width, color }, lineIdx) {
  const elTextEditContainer = document.querySelector(
    '.canvas-container .text-edit-container'
  )
  elTextEditContainer.style.top = pos.y - size + 'px'
  elTextEditContainer.style.left = pos.x + 'px'
  const elTextArea = `<input value="${txt}" oninput="handleInlineEdit(this.value, ${lineIdx})" style="color: ${color}; font-size: ${size}px; font-family: ${font};" class="edit-text" />`
  elTextEditContainer.innerHTML = elTextArea
}

function renderSearchData() {
  const elDataList = document.getElementById('tags')
  const keyWords = getKeyWords()
  const strHTML = keyWords
    .map((keyword) => {
      return `<option value="${keyword.keyword}"></option>`
    })
    .join('')

  elDataList.innerHTML = strHTML
}

// Event Listeners

function addEventListeners() {
  addMouseListeners()
  addTouchListeners()
  addResize()
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousemove', handleDragObject)
  gElCanvas.addEventListener('mousedown', handelSelectObject)
  gElCanvas.addEventListener('mouseup', handleStopDraging)
  gElCanvas.addEventListener('dblclick', handleDoubleClick)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchmove', handleDragObject)
  gElCanvas.addEventListener('touchstart', handelSelectObject)
  gElCanvas.addEventListener('touchend', handleStopDraging)
}

function addResize() {
  window.addEventListener('resize', handleResizeWindow)
}

function handleResizeWindow() {
  updateCnavasWidth()
  handleCanvasRender()
}

function handelSelectObject(ev) {
  if (checkIsOverResize(ev)) {
    setResizing()
    startDragging(ev)
    return
  }
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

  handleDeselectAll()
}

function handleDragObject(ev) {
  checkIsOverResize(ev)

  if (getIsResizing()) {
    resizeObject(ev)
    handleCanvasRender()
    return
  }

  dragObject(ev)
  handleCanvasRender()
}

function handleStopDraging() {
  stopDragging()
}

function handleDoubleClick(ev) {
  const selectedLineIdx = selectLine(ev)
  const line = getLineByIdx(selectedLineIdx)
  editLine(selectedLineIdx)
  renderTextArea(line, selectedLineIdx)
  handleCanvasRender()
}

// Download/Upload

function handleDownloadMeme(elLink) {
  const data = gElCanvas.toDataURL()
  elLink.href = data
  elLink.download = 'my-meme'
}

function handleUploadImg(isSaving = false) {
  const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

  // A function to be called if request succeeds
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    if (!isSaving) {
      document.querySelector(
        '.user-msg'
      ).innerText = `Your photo is available here: ${uploadedImgUrl}`

      document.querySelector('.share-container').innerHTML += `
            <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
               Share   
            </a>`
    }
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
      setMemeUrl(url)
      onSuccess(url)
    })
    .catch((err) => {
      console.error(err)
    })
}

function handleImgInput(ev) {
  handleCustomMeme()
  loadImageFromInput(ev, handleCanvasRender)
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader()

  reader.onload = (event) => {
    var img = new Image()
    // Render on canvas
    img.src = event.target.result
    setImgDataSrc(event.target.result)
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

function checkIsOverResize(ev) {
  const mousePos = getEvPos(ev)
  const selectedObject = getSelectedObject()
  if (!selectedObject) return

  const { pos, width, height } = selectedObject

  if (selectedObject.txt) {
    const cornerPos = {
      x: pos.x + width + 4,
      y: pos.y + 7,
    }
    const distFromCorner = getDistAbs(mousePos, cornerPos)
    document.body.style.cursor = distFromCorner < 10 ? 'nwse-resize' : 'auto'
    return distFromCorner < 10
  } else {
    const cornerPoses = [
      {
        x: pos.x - 5,
        y: pos.y - 5,
      },
      {
        x: pos.x + width,
        y: pos.y - 5,
      },
      {
        x: pos.x + width,
        y: pos.y + 5 + height,
      },
      {
        x: pos.x - 5,
        y: pos.y + 5 + height,
      },
    ]

    for (let i = 0; i < cornerPoses.length; i++) {
      const distFromCorner = getDistAbs(mousePos, cornerPoses[i])
      document.body.style.cursor = distFromCorner < 10 ? 'nwse-resize' : 'auto'
      if (distFromCorner < 10) {
        return true
      }
    }
  }
}
