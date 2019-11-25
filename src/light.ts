import { vec3 } from "gl-matrix"

export interface Light {
    shade(normal: vec3): vec3
}

export class Lights {
    /**
     * Multiple lights combined
     */
    lights: Light[]

    constructor(lights: Light[]) {
        this.lights = lights
    }

    shade(normal: vec3): vec3 {
        const result = vec3.fromValues(0, 0, 0)
        this.lights.forEach(light => {
            vec3.add(result, result, light.shade(normal))
        })
        return result
    }
}
