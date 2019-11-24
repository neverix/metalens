import { Surface, SurfaceHit } from "./surface"
import Ray from "./ray"
import { vec3 } from "gl-matrix"

export class Surfaces {
    /**
     * A surface consisting of multiple objects
     */
    objects: Surface[]

    constructor(objects: Surface[]) {
        this.objects = objects
    }

    hit(ray: Ray): SurfaceHit {
        /***
         * Computes a hit test between a ray and a list of objects.
         */
        let minDistance = Infinity
        let result: SurfaceHit = null
        this.objects.forEach(object => {
            const hit = object.hit(ray)
            if (hit == null) return
            const distance = vec3.dist(ray.position, hit.ray.position)
            if (distance > minDistance) return
            minDistance = distance
            result = hit
        })
        return result
    }
}
