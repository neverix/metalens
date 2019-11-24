import Ray from "./ray"
import { vec3 } from "gl-matrix"

export interface Surface {
    hit(ray: Ray): SurfaceHit
}

export interface SurfaceHit {
    albedo: vec3
    ray: Ray
}
