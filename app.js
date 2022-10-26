const cols = document.querySelectorAll(".col")

// Listeners

document.addEventListener("keydown", e => {
    if (e.code.toLowerCase() == "space") {
        e.preventDefault()
        setRandomColors()
    }
})

document.addEventListener("click", e => {
    const type = e.target.dataset.type

    if (type == "lock") {
        const node = e.target.tagName.toLowerCase() == "i" ? e.target : e.target.children[0]
        node.classList.toggle("fa-lock-open")
        node.classList.toggle("fa-lock")
    } else if (type == "copy") {
        copyToClickboard(e.target.textContent)
    }
})

// Functions

function generateRandomColor() {
    const hexCodes = "1234567890ABCDF"
    let color = ""
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return "#" + color
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? "black" : "white"
}

function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : []

    cols.forEach((col, index) => {
        const isLocked = col.querySelector("i").classList.contains("fa-lock")
        const text = col.querySelector("h2")
        const icon = col.querySelector("button")

        if (isLocked) {
            colors.push(text.textContent)
            return
        }
        const color = isInitial
            ? colors[index]
                ? colors[index]
                : chroma.random()
            : chroma.random()

        if (!isInitial) {
            colors.push(color)
        }

        text.textContent = color.toString().toUpperCase()
        col.style.background = color

        setTextColor(text, color)
        setTextColor(icon, color)
    })
    updateColorsHash(colors)
}

function copyToClickboard(text) {
    return navigator.clipboard.writeText(text)
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.map(color => color.toString().substring(1)).join("-")
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split("-").map(color => "#" + color)
    }
    return []
}

// Call

setRandomColors(true)