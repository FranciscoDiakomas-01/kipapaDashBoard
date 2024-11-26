export default function generateColor() {
    let red = Math.floor(Math.random(1) * 255)
    let blue = Math.floor(Math.random(1) * 255);
    let green = Math.floor(Math.random(1) * 255);
    const color = `rgb(${red}, ${green} ,${blue})`
    return color
}