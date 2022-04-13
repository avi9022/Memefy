'use strict'

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
]

const gMeme = {}

function imgChoice(id) {
  // Initializing the current meme
  gMeme.selectedImgId = id
  gMeme.selectedLineIdx = 0
  gMeme.lines = [
    {
      txt: 'My first meme',
      size: 48,
      font: 'impact',
      isBold: false,
      align: 'left',
      color: 'black',
      pos: { x: 50, y: 50 },
      isDragging: false,
    },
  ]
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

function addLine() {
  const lineY =
    gMeme.lines.length === 0 ? '50' : gMeme.lines.length === 1 ? 350 : 200
  const line = {
    txt: 'My next line',
    size: 48,
    font: 'impact',
    isBold: false,
    align: 'left',
    color: 'black',
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

function startDraging() {
  gMeme.isDragging = true
}

function stopDraging() {
  gMeme.isDragging = false
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
