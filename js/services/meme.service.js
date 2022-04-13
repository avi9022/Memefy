'use strict'

const gImg = [
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
  const img = getImgById(id)
  renderCanvas(img)

  gMeme.selectedImgId = id
  gMeme.selectedLineIdx = 0
  gMeme.lines = [
    {
      txt: 'My first Meme',
    },
  ]
}

function getImgById(id) {
  return gImg.find((img) => img.id === id)
}
