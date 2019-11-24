import { vec3 } from "gl-matrix"

export default class Ray {
    position: vec3
    direction: vec3

    constructor(position: vec3, direction: vec3) {
        this.position = position
        this.direction = direction
    }

    atPoint(distance: number) {
        const result = vec3.clone(this.position)
        vec3.scaleAndAdd(result, result, this.direction, distance)
        return result
    }
}