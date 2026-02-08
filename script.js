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

const images = Array.from(
  { length: 27 },
  (_, i) => `images/image.${i + 1}.jpeg`
)

let flipped = []
let lock = false
let matchedPairs = 0
const totalPairs = images.length

function init() {
  const values = []
  images.forEach(img => {
    values.push(img, img)
  })

  values.sort(() => Math.random() - 0.5)

  let index = 0

  heartShape.forEach(cell => {
    if (cell === 0) {
      const empty = document.createElement("div")
      empty.className = "empty"
      board.appendChild(empty)
    } else {
      const card = document.createElement("div")
      card.className = "card"

      const value = values[index % values.length]
      index++

      card.dataset.value = value

      card.innerHTML = `
        <div class="face front"></div>
        <div class="face back">
          <img src="${value}">
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
      matchedPairs++
      reset()

      if (matchedPairs === totalPairs) {
        showPage2()
      }
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

function showPage2() {
  const page2 = document.getElementById("page2")
  if (page2) {
    page2.classList.add("show")
  }
}
const noBtn = document.querySelector(".no-btn")

if (noBtn) {
  noBtn.addEventListener("mouseenter", moveNoButton)
  noBtn.addEventListener("click", moveNoButton)
}

function moveNoButton() {
  const btn = noBtn
  const padding = 20

  const maxX = window.innerWidth - btn.offsetWidth - padding
  const maxY = window.innerHeight - btn.offsetHeight - padding

  const x = Math.random() * maxX
  const y = Math.random() * maxY

  btn.style.position = "fixed"
  btn.style.left = `${x}px`
  btn.style.top = `${y}px`
}


init()
