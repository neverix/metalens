import { Surface, SurfaceHit } from "./surface"
import Ray from "./ray"
import { vec3 } from "gl-matrix"

export class World {
    objects: Surface[]

    constructor(objects: Surface[]) {
        this.objects = objects
    }

    hit(ray: Ray): SurfaceHit {
        return {
            albedo: vec3.create(),
            ray: ray
        }
    }
}
