import Camera from "./camera"
import { Surface } from "./surface"
import { vec3 } from "gl-matrix"

export default class Raytracer {
    camera: Camera
    world: Surface
    bounces: number

    constructor(camera: Camera, world: Surface, bounces?: number) {
        this.camera = camera
        this.world = world
        this.bounces = bounces || 3
    }

    render(image: ImageData) {
        /**
         * Renders and image using raycasting
         */
        // Create light vector
        const light = vec3.fromValues(0, -1, 0)
        // Loop over all pixels
        for (let x = 0; x < image.width; x++) {
            for (let y = 0; y < image.height; y++) {
                // Cast ray from camera surface
                let ray = this.camera.castRay(x, y)
                // Default color is white
                let color = vec3.fromValues(255, 255, 255)
                for (let i = 0; i < this.bounces; i++) {
                    // Do hit test
                    const hit = this.world.hit(ray)
                    if (hit == null) break
                    ray = hit.ray
                    // Compute Lambertian shading
                    if (hit.shade) {
                        // TODO make lighting customizable
                        const shading = vec3.dot(light, hit.ray.direction)
                        vec3.mul(
                            color,
                            color,
                            vec3.fromValues(shading, shading, shading)
                        )
                    }
                    // Modulate color
                    vec3.mul(color, color, hit.albedo)
                }
                // Set image pixel RGBA values
                const startIndex = (image.width * y + x) * 4
                image.data.set(color, startIndex)
                image.data[startIndex + 3] = 255
            }
        }
    }
}
