'use strict'

const DB_KEY = 'savedMemesDB'

const gImgs = [
  {
    id: 1,
    url: 'img/2.jpg',
    keywords: ['funny', 'politics'],
  },
  {
    id: 2,
    url: 'img/003.jpg',
    keywords: ['funny', 'dog'],
  },
  {
    id: 3,
    url: 'img/004.jpg',
    keywords: ['funny', 'dog', 'baby', 'babies'],
  },
  {
    id: 4,
    url: 'img/5.jpg',
    keywords: ['funny', 'cat', 'computer', 'sleep'],
  },
  {
    id: 5,
    url: 'img/005.jpg',
    keywords: ['funny', 'kid', 'sea', 'angry'],
  },
  {
    id: 6,
    url: 'img/006.jpg',
    keywords: ['funny', 'man', 'hair', 'explain', 'confused'],
  },
  {
    id: 7,
    url: 'img/8.jpg',
    keywords: ['funny', 'baby', 'surprised', 'chair'],
  },
  {
    id: 8,
    url: 'img/9.jpg',
    keywords: ['funny', 'man', 'hat', 'tell me more', 'tie'],
  },
  {
    id: 9,
    url: 'img/12.jpg',
    keywords: ['funny', 'man', 'hat', 'tell me more', 'tie'],
  },
  {
    id: 10,
    url: 'img/19.jpg',
    keywords: ['funny', 'man', 'hat', 'tell me more', 'tie'],
  },
  {
    id: 11,
    url: 'img/img2.jpg',
    keywords: ['funny', 'man', 'hat', 'tell me more', 'tie'],
  },
  {
    id: 12,
    url: 'img/img4.jpg',
    keywords: ['funny', 'man', 'hat', 'tell me more', 'tie'],
  },
  {
    id: 13,
    url: 'img/img5.jpg',
    keywords: ['funny', 'man', 'hat', 'tell me more', 'tie'],
  },
]
let gMeme
let gMouseStartPos
let gSavedMemes
let gCustomImgTag

function imgChoice(id) {
  // Initializing the current meme
  gMeme = {}
  gMeme.lines = []
  gMeme.selectedObjectIdx = {
    line: 0,
    sticker: null,
  }
  gMeme.stickers = []
  gMeme.isFromStorage = false

  if (id === 'surprise') {
    gMeme.selectedImgId = gImgs[getRandomInt(0, gImgs.length - 1)].id

    const randNumOfLines = getRandomInt(1, 2)
    for (let i = 0; i < randNumOfLines; i++) {
      addLine('random text', getRandomInt(16, 60), getRandomColorHex())
    }
  } else {
    gMeme.selectedImgId = id
    addLine('My first meme', 48, 'black')
  }
}

function updateLineTxt(txt) {
  const line = getSelectedObject()
  line.txt = txt
}

function moveTxtLineUp() {
  const line = getSelectedObject()
  line.pos.y -= 5
}

function moveTxtLineDown() {
  const line = getSelectedObject()
  line.pos.y += 5
}

function increaseFont() {
  const line = getSelectedObject()
  line.size += 1
}

function decreaseFont() {
  const line = getSelectedObject()
  line.size -= 1
}

function alignTxt(val) {
  const line = getSelectedObject()
  line.align = val
}

function changeFont(font) {
  const line = getSelectedObject()
  line.font = font
}

function toggleBoldTxt() {
  const line = getSelectedObject()
  line.isBold = !line.isBold
}

function changeFontColor(color) {
  const line = getSelectedObject()
  line.color = color
}

function addLine(txt = 'My next line', size = 40, color = 'black') {
  const lineY =
    gMeme.lines.length === 0 ? 50 : gMeme.lines.length === 1 ? 350 : 200
  const line = {
    txt: txt,
    size,
    font: 'impact',
    isBold: false,
    align: 'left',
    color,
    pos: {
      x: 50,
      y: lineY,
    },
  }

  gMeme.lines.push(line)
  gMeme.selectedObjectIdx.line = gMeme.lines.length - 1
}

function switchLines() {
  gMeme.selectedObjectIdx.line =
    gMeme.selectedObjectIdx.line + 1 > gMeme.lines.length - 1
      ? 0
      : gMeme.selectedObjectIdx.line + 1
}

function deleteObject() {
  if (gMeme.selectedObjectIdx.line !== null) {
    gMeme.lines.splice(gMeme.selectedObjectIdx.line, 1)
  } else gMeme.stickers.splice(gMeme.selectedObjectIdx.sticker, 1)
}

function setCurrMemeFromStorage(idx) {
  gMeme = gSavedMemes[idx]
  gMeme.isFromStorage = true
}

function setCurrMemeCustom() {
  gMeme = {}
  gMeme.lines = []
  gMeme.selectedObjectIdx = {
    line: 0,
    sticker: null,
  }
  gMeme.stickers = []
  gMeme.isFromStorage = false
  gMeme.isCustom = true
  addLine('My first meme', 48, 'black')
}

function setCustomImgTag(img) {
  gCustomImgTag = img
}

function addSticker(sticker) {
  sticker.pos = { x: 100, y: 100 }
  sticker.width = 100
  sticker.height = 100
  gMeme.stickers.push(sticker)
}

function selectLine(ev) {
  const mousePos = getEvPos(ev)
  const lines = getTxtLines()
  return lines.findIndex((line) => checkLineSelection(line, mousePos))
}

function setSelectedLine(idx) {
  gMeme.selectedObjectIdx.line = idx
  gMeme.selectedObjectIdx.sticker = null
}
function setSelectedSticker(idx) {
  gMeme.selectedObjectIdx.sticker = idx
  gMeme.selectedObjectIdx.line = null
}

function selectSticker(ev) {
  const mousePos = getEvPos(ev)
  const stickers = gMeme.stickers
  return stickers.findIndex((sticker) =>
    checkStickerSelection(sticker, mousePos)
  )
}

function checkLineSelection({ pos, width, size }, mousePos) {
  return (
    mousePos.x >= pos.x &&
    mousePos.x <= pos.x + width &&
    mousePos.y <= pos.y &&
    mousePos.y >= pos.y - size
  )
}

function checkStickerSelection({ pos, width, height }, mousePos) {
  return (
    mousePos.x >= pos.x &&
    mousePos.x <= pos.x + width &&
    mousePos.y >= pos.y &&
    mousePos.y <= pos.y + height
  )
}

function deselectAll() {
  gMeme.selectedObjectIdx.line = null
  gMeme.selectedObjectIdx.sticker = null
}

// Getters

function getImgById(id) {
  return gImgs.find((img) => img.id === id)
}

function getSelectedImg() {
  return getImgById(gMeme.selectedImgId)
}

function getTxtLines() {
  return gMeme.lines
}

function getSelectedObject() {
  if (gMeme.selectedObjectIdx.line !== null) {
    return gMeme.lines[gMeme.selectedObjectIdx.line]
  } else if (gMeme.selectedObjectIdx.sticker !== null) {
    return gMeme.stickers[gMeme.selectedObjectIdx.sticker]
  }
}

function getSelectedObjects() {
  return gMeme.selectedObjectIdx
}

function getLineText() {
  return gMeme.lines[gMeme.selectedObjectIdx.line].txt
}

function getSavedMemes() {
  return gSavedMemes
}

function getImgs() {
  return gImgs
}

function getAddedStickers() {
  return gMeme.stickers
}

function getRenderedImgs(filter) {
  return gImgs.filter((img) => img.keywords.includes(filter))
}

function getIsCustom() {
  return gMeme.isCustom
}

function getCustomImgTag() {
  return gCustomImgTag
}

// Dragging
function startDragging(ev) {
  gMeme.isDragging = true
  gMouseStartPos = getEvPos(ev)
}

function stopDragging() {
  gMeme.isDragging = false
}

function dragObject(ev) {
  if (!gMeme.isDragging) return
  const currMousePos = getEvPos(ev)
  const diff = getDist(gMouseStartPos, currMousePos)
  const selectedObject = getSelectedObject()
  selectedObject.pos.x += diff.x
  selectedObject.pos.y += diff.y

  gMouseStartPos = currMousePos
}

// Storage

function saveMeme() {
  if (gMeme.isFromStorage) {
    gSavedMemes[gMeme.idxInStorage] = gMeme
  } else {
    gMeme.idxInStorage = gSavedMemes.length
    gSavedMemes.push(gMeme)
  }
  _saveMemesToStorage()
}

function loadSavedMemes() {
  gSavedMemes = _loadMemesFromStorage() ? _loadMemesFromStorage() : []
}

function _saveMemesToStorage() {
  saveToStorage(DB_KEY, gSavedMemes)
}

function _loadMemesFromStorage() {
  return loadFromStorage(DB_KEY)
}
