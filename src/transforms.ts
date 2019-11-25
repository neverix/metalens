import { mat4, vec3, quat } from "gl-matrix"
import { Surface, SurfaceHit } from "./surface"
import Ray from "./ray"

export class Translate {
    /**
     * Wrapper to apply a translation/offset to a surface
     */
    translation: vec3
    surface: Surface

    constructor(surface: Surface, translation: vec3) {
        this.surface = surface
        this.translation = translation
    }

    hit(ray: Ray): SurfaceHit {
        const position = vec3.clone(ray.position)
        vec3.sub(position, position, this.translation)
        ray = new Ray(position, ray.direction)
        return this.surface.hit(ray)
    }
}
