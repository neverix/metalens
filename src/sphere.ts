import Ray from "./ray"
import { SurfaceHit } from "./surface"
import { vec3 } from "gl-matrix"

export class Sphere {
    /**
     * Unit sphere surface.
     */

    hit(ray: Ray): SurfaceHit {
        const a = vec3.dot(ray.direction, ray.direction)
        const b = vec3.dot(ray.position, ray.direction)
        const c = vec3.dot(ray.position, ray.position) - 1
        const d = b * b - a * c
        if (d <= 0) {
            return null
        }
        const t = (Math.sqrt(d) - b) / a
        const position = ray.atPoint(t)
        const direction = vec3.clone(position)
        vec3.normalize(direction, direction)
        ray = new Ray(position, direction)
        return {
            albedo: vec3.fromValues(1, 1, 1),
            ray,
            shade: true,
            distance: t
        }
    }
}
