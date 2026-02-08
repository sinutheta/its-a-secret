const board = document.getElementById("board")

window.addEventListener("load", () => {
  document.getElementById("page2").style.display = "none"
  document.getElementById("page3").style.display = "none"
  document.getElementById("page4").style.display = "none"
  document.getElementById("page5").style.display = "none"
})

const heartShape = [0, 0, 1, 1, 0]

const images = [`images/image.1.jpeg`]

let flipped = []
let lock = false
let matchedPairs = 0
const totalPairs = heartShape.filter(v => v === 1).length / 2

function init() {
  const values = [...images, ...images].sort(() => Math.random() - 0.5)
  let index = 0

  heartShape.forEach(cell => {
    if (cell === 0) {
      const empty = document.createElement("div")
      empty.className = "empty"
      board.appendChild(empty)
    } else {
      const card = document.createElement("div")
      card.className = "card"
      const value = values[index++ % values.length]

      card.dataset.value = value
      card.innerHTML = `
        <div class="face front"></div>
        <div class="face back">
          <img src="${value}">
        </div>
      `
      card.onclick = () => flip(card)
      board.appendChild(card)
    }
  })
}

function flip(card) {
  if (lock || card.classList.contains("flip") || card.classList.contains("matched")) return
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
        document.getElementById("page1").style.display = "none"
        document.getElementById("page2").style.display = "flex"
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

/* NO BUTTON RUN AWAY */
const noBtn = document.querySelector(".no-btn")
if (noBtn) {
  document.addEventListener("mousemove", e => {
    const rect = noBtn.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < 120) {
      const angle = Math.atan2(dy, dx)
      noBtn.style.transform = `translate(${-Math.cos(angle) * 100}px, ${-Math.sin(angle) * 100}px)`
    }
  })
}

/* PAGE 2 → 3 */
document.querySelector(".yes-btn")?.addEventListener("click", () => {
  document.getElementById("page2").style.display = "none"
  document.getElementById("page3").style.display = "flex"
})

/* PAGE 3 → 4 */
document.querySelector(".continue-btn")?.addEventListener("click", () => {
  document.getElementById("page3").style.display = "none"
  document.getElementById("page4").style.display = "flex"
})

/* SUBMIT FORM */
document.getElementById("submitPlan")?.addEventListener("click", () => {
  alert("Date booked successfully 💖 Please click continue")
})

/* PAGE 4 → 5 */
document.querySelector(".final-continue")?.addEventListener("click", () => {
  document.getElementById("page4").style.display = "none"
  document.getElementById("page5").style.display = "flex"
})

init()

