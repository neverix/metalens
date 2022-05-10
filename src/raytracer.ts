import Camera from "./camera"
import { Surface } from "./surface"
import { vec3 } from "gl-matrix"
import { Light } from "./light"
import { normal } from "./math"

export default class Raytracer {
    camera: Camera
    world: Surface
    light: Light
    bounces: number
    shuffle: number
    focal: number
    aperture: number

    constructor(
        camera: Camera,
        world: Surface,
        light: Light,
        bounces?: number,
        shuffle?: number,
        focal?: number,
        aperture?: number
    ) {
        this.camera = camera
        this.world = world
        this.light = light
        this.bounces = bounces || 5
        this.shuffle = shuffle || 0.1
        this.focal = focal || 0.2
        this.aperture = aperture || 0.05
    }

    render(image: ImageData) {
        /**
         * Renders and image using raycasting
         */
        // Maximum channel values
        const maxColor = vec3.fromValues(255, 255, 255)
        // Loop over all pixels
        for (let x = 0; x < image.width; x++) {
            for (let y = 0; y < image.height; y++) {
                // Cast ray from camera surface
                let ray = this.camera.castRay(x, y)
                // Shuffle (disk permutation)
                // Disk shuffle
                ray.position[0] += normal() * this.shuffle
                ray.position[1] += normal() * this.shuffle
                // Default color is white
                let color = vec3.fromValues(0, 0, 0)
                for (let i = 0; i < this.bounces; i++) {
                    // Do hit test
                    const hit = this.world.hit(ray)
                    if (hit == null) break
                    ray = hit.ray
                    // Compute Lambertian shading
                    if (hit.shade) {
                        const shading = this.light.shade(ray.direction)
                        vec3.add(color, color, shading)
                    }
                    // Modulate color
                    vec3.mul(color, color, hit.albedo)
                    if (hit.shade) break
                }
                // Set image pixel RGBA values
                vec3.mul(color, color, maxColor)
                const startIndex = (image.width * y + x) * 4
                image.data.set(color, startIndex)
                image.data[startIndex + 3] = 255
            }
        }
    }
}
