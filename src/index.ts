import Raytracer from "./raytracer"
import Camera from "./camera"
import { vec3, quat } from "gl-matrix"
import { Surfaces } from "./surfaces"
import { Lambertian } from "./lambertian"

function main() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    const { width, height } = canvas
    const ctx = canvas.getContext("2d")
    const image = ctx.createImageData(width, height)
    const camera = new Camera(vec3.create(), quat.create())
    const raytracer = new Raytracer(
        camera,
        new Surfaces([]),
        new Lambertian(vec3.fromValues(0, -1, 0), vec3.fromValues(10, 10, 10))
    )
    raytracer.render(image)
    ctx.putImageData(image, 0, 0)
}

onload = main
