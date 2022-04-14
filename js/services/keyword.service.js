'use strict'

const keyWords = new Set()
const WORDS_PER_LINE = 5

function initSearchKeyWords(imgs) {
  imgs.forEach((img) => {
    img.keywords.forEach((keyword) => keyWords.add(keyword))
  })
}

function getKeyWords() {
  return keyWords
}
