'use strict'

const DB_KEY = 'savedMemesDB'

const gImgs = [
  {
    id: 1,
    url: 'img/1.jpg',
    keywords: ['funny', 'politics'],
  },
  {
    id: 2,
    url: 'img/2.jpg',
    keywords: ['funny', 'dog'],
  },
  {
    id: 3,
    url: 'img/3.jpg',
    keywords: ['funny', 'dog', 'baby', 'babies'],
  },
  {
    id: 4,
    url: 'img/4.jpg',
    keywords: ['funny', 'cat', 'computer', 'sleep'],
  },
  {
    id: 5,
    url: 'img/5.jpg',
    keywords: ['funny', 'kid', 'sea', 'angry'],
  },
  {
    id: 6,
    url: 'img/6.jpg',
    keywords: ['funny', 'man', 'hair', 'explain', 'confused'],
  },
  {
    id: 7,
    url: 'img/7.jpg',
    keywords: ['funny', 'baby', 'surprised', 'chair'],
  },
  {
    id: 8,
    url: 'img/8.jpg',
    keywords: ['funny', 'man', 'hat', 'tell me more', 'tie'],
  },
]
let gMeme
let gMouseStartPos
let gSavedMemes

function imgChoice(id) {
  gMeme = {}
  gMeme.lines = []
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
  gMeme.isFromStorage = false

  // Initializing the current meme
  gMeme.selectedLineIdx = 0
}

function updateLineTxt(txt) {
  const line = getSelectedLine()
  line.txt = txt
}

function moveTxtLineUp() {
  const line = getSelectedLine()
  line.pos.y -= 5
}

function moveTxtLineDown() {
  const line = getSelectedLine()
  line.pos.y += 5
}

function increaseFont() {
  const line = getSelectedLine()
  line.size += 1
}

function decreaseFont() {
  const line = getSelectedLine()
  line.size -= 1
}

function alignTxt(val) {
  const line = getSelectedLine()
  line.align = val
}

function changeFont(font) {
  const line = getSelectedLine()
  line.font = font
}

function toggleBoldTxt() {
  const line = getSelectedLine()
  line.isBold = !line.isBold
}

function changeFontColor(color) {
  const line = getSelectedLine()
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
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLines() {
  gMeme.selectedLineIdx =
    gMeme.selectedLineIdx + 1 > gMeme.lines.length - 1
      ? 0
      : gMeme.selectedLineIdx + 1
}

function deleteLine() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function setCurrMemeFromStorage(idx) {
  gMeme = gSavedMemes[idx]
  gMeme.isFromStorage = true
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

function getSelectedLine() {
  return gMeme.lines[gMeme.selectedLineIdx]
}

function getSelectedLineIdx() {
  return gMeme.selectedLineIdx
}

function setSelectedLine(idx) {
  gMeme.selectedLineIdx = idx
}

function getLineText() {
  return gMeme.lines[gMeme.selectedLineIdx].txt
}

function getSavedMemes() {
  return gSavedMemes
}

function getImgs() {
  return gImgs
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
  const line = getSelectedLine()
  line.pos.x += diff.x
  line.pos.y += diff.y

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
