const cols = document.querySelectorAll(".col")



function generateRandomColor() {
    const hexCodes = "1234567890ABCDF"
    let color = ""
    for (let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return "#" + color
}


function setRandomColors() {
    cols.forEach(col => {
        col.style.background = generateRandomColor()
    })
}

setRandomColors()