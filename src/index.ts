import Raytracer from "./raytracer"
import Camera from "./camera"
import { vec3, quat } from "gl-matrix"
import { Surfaces } from "./surfaces"
import { Lambertian } from "./lambertian"
import { Translate, Tint } from "./transforms"
import { Sphere } from "./sphere"
import { Lights } from "./light"

function main() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    const { width, height } = canvas
    const ctx = canvas.getContext("2d")
    const image = ctx.createImageData(width, height)
    const camera = new Camera(width, height, vec3.create(), quat.create())
    const raytracer = new Raytracer(
        camera,
        new Surfaces([
            new Translate(
                new Tint(new Sphere(), vec3.fromValues(0.75, 0.75, 0.75)),
                vec3.fromValues(0, 0, 10)
            )
        ]),
        new Lights([
            new Lambertian(
                vec3.fromValues(1, 1, 0.5),
                vec3.fromValues(0.7, 0.2, 1)
            ),
            new Lambertian(
                vec3.fromValues(-2, -1, -3),
                vec3.fromValues(1, 0.6, 0.2)
            )
        ])
    )
    raytracer.render(image)
    ctx.putImageData(image, 0, 0)
}

onload = main
