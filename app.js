const cols = document.querySelectorAll(".col")

document.addEventListener("keydown", e => {
    if (e.code.toLowerCase() == "space") {
        setRandomColors()
    }
})

document.addEventListener("click", e => {
    const type = e.target.dataset.type

    if (type == "lock") {
        const node = e.target.tagName.toLowerCase() == "i" ? e.target : e.target.children[0]
        console.log(node)
    }
})


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

function setRandomColors() {
    cols.forEach(col => {
        const text = col.querySelector("h2")
        const icon = col.querySelector("button")
        const color = chroma.random()

        text.textContent = color.toString().toUpperCase()
        col.style.background = color

        setTextColor(text, color)
        setTextColor(icon, color)
    })
}

setRandomColors()