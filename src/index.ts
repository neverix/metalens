function main() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    const { width, height } = canvas
    const ctx = canvas.getContext("2d")
    const image = ctx.createImageData(width, height)
    ctx.putImageData(image, 0, 0)
}

document.addEventListener("load", () => main())
