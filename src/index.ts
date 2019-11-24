import Raytracer from "./raytracer"
import Camera from "./camera"
import { vec3, quat } from "gl-matrix"
import { World } from "./world"

function main() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    const { width, height } = canvas
    const ctx = canvas.getContext("2d")
    const image = ctx.createImageData(width, height)
    const camera = new Camera(vec3.create(), quat.create())
    const raytracer = new Raytracer(camera, new World([]))
    raytracer.render(image)
    ctx.putImageData(image, 0, 0)
}

onload = main
