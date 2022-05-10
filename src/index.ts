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

    // TODO:
    // - [x] Add accumulation buffer for DoF
    //   - [x] Add DoF
    //   - [ ] Add proper DoF
    // - [ ] Add reflections
    //   - [ ] Add refractions
    // - [ ] Add textures
    // - [ ] Add cylinders
    // - [ ] Add meshes
    // - [ ] Add CSG
    // - [ ] Add lenses
    // - [ ] Add live mode
    //   - [ ] Add second view?

    const raytracer = new Raytracer(
        camera,
        new Scale(
            new Surfaces([
                new Translate(
                    new Scale(new Lens(0.5), vec3.fromValues(2, 2, 2)),
                    vec3.fromValues(0, 0, 0.1)
                ),
                new Translate(
                    new Tint(new Sphere(), vec3.fromValues(1, 0, 0)),
                    vec3.fromValues(-5, 0, 15)
                ),
                new Translate(
                    new Tint(
                        new Scale(
                            new Tint(new Sphere(), vec3.fromValues(0, 1, 0)),
                            vec3.fromValues(2, 2, 2)
                        ),
                        vec3.fromValues(0.75, 0.75, 0.75)
                    ),
                    vec3.fromValues(1, 1, 7)
                )
            ]),
            vec3.fromValues(-1, -1, 1)
        ),
        new Lights([
            new Lambertian(
                vec3.fromValues(-1, -1, -0.5),
                vec3.fromValues(3, 3, 3)
            )
        ]),
        2,  // N bounces
        0.2  // DoF disk
        // DoF focal length
        // DoF aperture
    )

    let n = 0
    const accumulation = 128;
    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const buffer = ctx.createImageData(width, height)
        raytracer.render(buffer)
        buffer.data.forEach((x, i) => {
            image.data[i] = (
                image.data[i] * (n / (n + 1)) +
                x * (1 / (n + 1)))
        })
        ctx.putImageData(image, 0, 0)
        n += 1
        n = Math.min(n, accumulation)
        requestAnimationFrame(update)
    }

    update()
}

onload = main
