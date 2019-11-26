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
            const distance = hit.distance
            if (distance >= minDistance) return
            if (distance <= Number.EPSILON) return
            minDistance = distance
            result = hit
        })
        return result
    }
}
