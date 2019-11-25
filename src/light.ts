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
        let result = vec3.create()
        this.lights.forEach(light => {
            vec3.add(result, result, light.shade(normal))
        })
        return result
    }
}
