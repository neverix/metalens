import Camera from "./camera"
import { Surface } from "./surface"

export default class Raytracer {
    camera: Camera
    world: Surface

    constructor(camera: Camera, world: Surface) {
        this.camera = camera
        this.world = world
    }

    render(image: ImageData) {
        for (let x = 0; x < image.width; x++) {
            for (let y = 0; y < image.height; y++) {
                const ray = this.camera.castRay(x, y)
                // TODO
            }
        }
    }
}
