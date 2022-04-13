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
