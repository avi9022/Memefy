'usr strict'

const gStickers = []
const STICKERS_PER_PAGE = 3
let gLastSticker = STICKERS_PER_PAGE

function initStickers() {
  for (let i = 1; i <= 26; i++) {
    const sticker = {
      id: i,
      url: `img/stickers/sticker_${i}.png`,
    }
    gStickers.push(sticker)
  }
}

function getStickersToDisplay() {
  return gStickers.filter((sticker, idx) => {
    return idx + 1 <= gLastSticker && idx >= gLastSticker - STICKERS_PER_PAGE
  })
}

function getStickerById(id) {
  return gStickers.find((sticker) => sticker.id === id)
}

function slideStickers(dir) {
  gLastSticker += dir
  if (gLastSticker < STICKERS_PER_PAGE) gLastSticker = STICKERS_PER_PAGE
  else if (gLastSticker > gStickers.length) gLastSticker = gStickers.length
}
