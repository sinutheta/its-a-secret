const board = document.getElementById("board")


const heartShape = [
  0,0,1,1,0
]

const images = Array.from(
  { length: 1 },
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
  const page1 = document.getElementById("page1")
  const page2 = document.getElementById("page2")

  if (page1 && page2) {
    page1.classList.remove("show")

    setTimeout(() => {
      page2.classList.add("show")
    }, 600)
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.querySelector(".no-btn")
  if (!noBtn) return

  let offsetX = 0
  let offsetY = 0

  document.addEventListener("mousemove", (e) => {
    const rect = noBtn.getBoundingClientRect()

    const btnCenterX = rect.left + rect.width / 2
    const btnCenterY = rect.top + rect.height / 2

    const dx = e.clientX - btnCenterX
    const dy = e.clientY - btnCenterY

    const distance = Math.sqrt(dx * dx + dy * dy)

    const TRIGGER_DISTANCE = 120

    if (distance < TRIGGER_DISTANCE) {
      const angle = Math.atan2(dy, dx)

      const MOVE_DISTANCE = 80

      offsetX = -Math.cos(angle) * MOVE_DISTANCE
      offsetY = -Math.sin(angle) * MOVE_DISTANCE

      noBtn.style.transform = `translate(${offsetX}px, ${offsetY}px)`
    }
  })

  noBtn.addEventListener("click", (e) => {
    e.preventDefault()
  })
})
const yesBtn = document.querySelector(".yes-btn")
const page2 = document.getElementById("page2")
const page3 = document.getElementById("page3")

if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    page2.classList.remove("show")

    setTimeout(() => {
      page3.classList.add("show")
    }, 600)
  })
}
const continueBtn = document.querySelector(".continue-btn")
const page4 = document.getElementById("page4")

if (continueBtn) {
  continueBtn.addEventListener("click", () => {
    page3.classList.remove("show")

    setTimeout(() => {
      page4.classList.add("show")
    }, 600)
  })
}





init()
