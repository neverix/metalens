import Raytracer from "./raytracer"
import Camera from "./camera"
import { vec3, quat } from "gl-matrix"
import { Surfaces } from "./surfaces"
import { Lambertian } from "./lambertian"
import { Translate, Tint, Scale } from "./transforms"
import { Sphere } from "./sphere"
import { Lights } from "./light"
import { Lens } from "./lens"

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
                new Scale(new Lens(0.7), vec3.fromValues(2, 2, 2)),
                vec3.fromValues(0, 0, 1)
            ),
            new Translate(
                new Tint(new Sphere(), vec3.fromValues(0.75, 0.75, 0.75)),
                vec3.fromValues(0, 0, 15)
            ),
            new Translate(
                new Tint(
                    new Scale(new Sphere(), vec3.fromValues(0.5, 0.5, 0.5)),
                    vec3.fromValues(0.75, 0.75, 0.75)
                ),
                vec3.fromValues(1, 1, 7)
            )
        ]),
        new Lights([
            new Lambertian(vec3.fromValues(1, 1, 0.5), vec3.fromValues(1, 1, 1))
        ])
    )
    raytracer.render(image)
    ctx.putImageData(image, 0, 0)
}

onload = main
