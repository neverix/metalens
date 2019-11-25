import { vec3 } from "gl-matrix"

export class Lambertian {
    /**
     * Lambertian light.
     */
    direction: vec3
    color: vec3

    constructor(direction: vec3, color: vec3) {
        this.direction = direction
        this.color = color
    }

    shade(normal: vec3): vec3 {
        /**
         * Shades a surface according to the Lambertian shading model
         */
        const shading = vec3.dot(normal, this.direction)
        const result = vec3.clone(this.color)
        vec3.mul(result, result, vec3.fromValues(shading, shading, shading))
        return result
    }
}
