const board = document.getElementById("board")

const heartShape = [
  0,0,1,1,0,1,1,0,0,
  0,1,1,1,1,1,1,1,0,
  1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,
  1,1,1,1,1,1,1,1,1,
  0,1,1,1,1,1,1,1,0,
  0,0,1,1,1,1,1,0,0,
  0,0,0,1,1,1,0,0,0,
  0,0,0,0,1,0,0,0,0
]

const CENTER_INDEX = 40

const images = Array.from(
  { length: 22 },
  (_, i) => `images/image${i + 1}.jpeg`
)

let flipped = []
let lock = false

function init() {
  const values = new Array(heartShape.length).fill(null)

  const positions = heartShape
    .map((v, i) => v === 1 && i !== CENTER_INDEX ? i : null)
    .filter(i => i !== null)

  positions.sort(() => Math.random() - 0.5)

  images.forEach(img => {
    const a = positions.pop()
    const b = positions.pop()
    values[a] = img
    values[b] = img
  })

  values[CENTER_INDEX] = "HEART"

  heartShape.forEach((cell, i) => {
    if (cell === 0) {
      const empty = document.createElement("div")
      empty.className = "empty"
      board.appendChild(empty)
    } else {
      const card = document.createElement("div")
      card.className = "card"
      card.dataset.value = values[i]

      card.innerHTML = `
        <div class="face front"></div>
        <div class="face back">
          ${
            values[i] === "HEART"
              ? `<div style="font-size:32px;display:flex;align-items:center;justify-content:center;height:100%">💖</div>`
              : `<img src="${values[i]}">`
          }
        </div>
      `

      card.addEventListener("click", () => flip(card))
      board.appendChild(card)
    }
  })
}

function flip(card) {
  if (
    lock ||
    card.classList.contains("flip") ||
    card.classList.contains("matched")
  ) return

  card.classList.add("flip")

  if (card.dataset.value === "HEART") return

  flipped.push(card)

  if (flipped.length === 2) checkMatch()
}

function checkMatch() {
  lock = true
  const [a, b] = flipped

  if (a.dataset.value === b.dataset.value) {
    setTimeout(() => {
      a.classList.add("matched")
      b.classList.add("matched")
      reset()
    }, 600)
  } else {
    setTimeout(() => {
      a.classList.remove("flip")
      b.classList.remove("flip")
      reset()
    }, 800)
  }
}

function reset() {
  flipped = []
  lock = false
}

init()
