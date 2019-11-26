import { vec3 } from "gl-matrix"
import Ray from "./ray"
import { SurfaceHit } from "./surface"

export class Lens {
    /**
     * Geometric lens.
     */
    focus: vec3

    constructor(focalLength: number) {
        this.focus = vec3.fromValues(0, 0, focalLength)
    }

    hit(ray: Ray): SurfaceHit {
        const intersection = ray.intersectPlane()
        if (intersection == null) return null
        if (intersection < 0) return null
        const point = ray.atPoint(intersection)
        if (vec3.len(point) > 1) return null
        const ray1dir = vec3.create()
        vec3.subtract(ray1dir, ray1dir, ray.position)
        vec3.normalize(ray1dir, ray1dir)
        const ray1 = new Ray(ray.position, ray1dir)
        const ray2ray = new Ray(ray.position, vec3.fromValues(0, 0, 1))
        const ray2dist = ray2ray.intersectPlane()
        if (ray2dist == null) return null
        if (ray2dist < 0) return null
        const ray2pos = ray2ray.atPoint(ray2dist)
        if (ray.position[2] > 0) {
            vec3.negate(this.focus, this.focus)
        }
        const ray2dir = vec3.create()
        vec3.sub(ray2dir, this.focus, ray2pos)
        vec3.normalize(ray2dir, ray2dir)
        const ray2 = new Ray(ray2pos, ray2dir)
        const focus = vec3.clone(this.focus) // ray1.intersectRay(ray2)

        if (focus[2] > 0) {
            vec3.sub(focus, focus, point)
        } else {
            vec3.sub(focus, point, focus)
        }
        vec3.normalize(focus, focus)
        ray = new Ray(point, focus)
        return {
            ray,
            albedo: vec3.fromValues(1, 1, 1),
            shade: false,
            distance: intersection
        }
    }
}
