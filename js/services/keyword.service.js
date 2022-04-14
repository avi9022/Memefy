'use strict'

const keyWords = new Set()
const WORDS_PER_LINE = 5

let keyWordsObjs

function initSearchKeyWords(imgs) {
  imgs.forEach((img) => {
    img.keywords.forEach((keyword) => keyWords.add(keyword))
  })

  convertToObjs()
}

function convertToObjs() {
  // Turning keywords to objects with click count
  keyWordsObjs = Array.from(keyWords).map((keyword) => {
    return {
      keyword,
      clickCount: getRandomInt(0, 5),
    }
  })
}

function increaseClickCount(word) {
  const keyword = getKeyWord(word)
  keyword.clickCount++
}

function getKeyWord(word) {
  return keyWordsObjs.find((keyword) => keyword.keyword === word)
}

function getKeyWords() {
  return keyWordsObjs
}
