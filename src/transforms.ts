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
        const hit = this.surface.hit(ray)
        if (hit == null) return
        vec3.add(hit.ray.position, hit.ray.position, this.translation)
        return hit
    }
}

export class Scale {
    /**
     * Wrapper to apply scaling to a surface
     */
    scale: vec3
    surface: Surface

    constructor(surface: Surface, scale: vec3) {
        this.surface = surface
        this.scale = scale
    }

    hit(ray: Ray): SurfaceHit {
        const position = vec3.clone(ray.position)
        vec3.div(position, position, this.scale)
        ray = new Ray(position, ray.direction)
        const hit = this.surface.hit(ray)
        if (hit == null) return
        vec3.mul(hit.ray.position, hit.ray.position, this.scale)
        return hit
    }
}

export class Tint {
    /**
     * Tints a surface's albedo
     */
    color: vec3
    surface: Surface

    constructor(surface: Surface, color: vec3) {
        this.surface = surface
        this.color = color
    }

    hit(ray: Ray): SurfaceHit {
        const hit = this.surface.hit(ray)
        if (hit == null) return null
        vec3.mul(hit.albedo, hit.albedo, this.color)
        return hit
    }
}
