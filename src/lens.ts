import { vec3 } from "gl-matrix"
import Ray from "./ray"
import { SurfaceHit } from "./surface"

export class Lens {
    /**
     * Geometric lens.
     */
    position: vec3
    normal: vec3
    radius: number
    focalLength: number

    constructor(
        position: vec3,
        normal: vec3,
        radius: number,
        focalLength: number
    ) {
        this.position = position
        this.normal = normal
        this.radius = radius
        this.focalLength = focalLength
    }

    hit(ray: Ray): SurfaceHit {
        return { ray, albedo: vec3.create(), shade: false }
    }
}
