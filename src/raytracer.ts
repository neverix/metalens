import Camera from "./camera";

export default class Raytracer {
    camera: Camera

    constructor(camera: Camera) {
        this.camera = camera
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