const board = document.getElementById("board")


const heartShape = [
  0,0,1,1,0
]

const images = Array.from(
  { length: 2 },
  (_, i) => `images/image.${i + 1}.jpeg`
)

let flipped = []
let lock = false
let matchedPairs = 0
const totalPairs = heartShape.filter(v => v === 1).length / 2


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

document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.querySelector(".no-btn")
  if (!noBtn) return

  let currentX = 0
  let currentY = 0
  let isMoving = false

  document.addEventListener("mousemove", (e) => {
    if (isMoving) return

    const rect = noBtn.getBoundingClientRect()
    const btnX = rect.left + rect.width / 2
    const btnY = rect.top + rect.height / 2

    const dx = e.clientX - btnX
    const dy = e.clientY - btnY
    const distance = Math.sqrt(dx * dx + dy * dy)

    const TRIGGER_DISTANCE = 140

    if (distance < TRIGGER_DISTANCE) {
      isMoving = true

      const angle = Math.atan2(dy, dx)

      const moveDistance =
        300 + Math.random() * 150

      let newX =
        currentX - Math.cos(angle) * moveDistance
      let newY =
        currentY - Math.sin(angle) * moveDistance

      const maxX =
        window.innerWidth - rect.width - 20
      const maxY =
        window.innerHeight - rect.height - 20

      newX = Math.min(Math.max(newX, -btnX + 20), maxX - btnX)
      newY = Math.min(Math.max(newY, -btnY + 20), maxY - btnY)

      currentX = newX
      currentY = newY

      noBtn.style.transform =
        `translate(${currentX}px, ${currentY}px)`

      setTimeout(() => {
        isMoving = false
      }, 350)
    }
  })

  noBtn.addEventListener("click", (e) => {
    e.preventDefault()
  })
})



init()
