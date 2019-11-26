import { vec3, vec4, mat3 } from "gl-matrix"

export default class Ray {
    position: vec3
    direction: vec3

    constructor(position: vec3, direction: vec3) {
        this.position = position
        this.direction = direction
    }

    atPoint(distance: number) {
        /**
         * Calculates the point on the ray at distance d.
         */
        const result = vec3.clone(this.position)
        vec3.scaleAndAdd(result, result, this.direction, distance)
        return result
    }

    intersectPlane(): number {
        /**
         * Finds intersection with plane at world origin pointing at the camera.
         */
        const normal = vec3.fromValues(0, 0, 1)
        const point = vec3.clone(this.position)
        vec3.negate(point, point)
        const t = vec3.dot(point, normal)
        const f = vec3.dot(this.direction, normal)
        if (Math.abs(f) < Number.EPSILON) return null
        return t / f
    }

    intersectRay(other: Ray): vec3 {
        /**
         * Finds the closest point between two rays.
         */
        // From https://math.stackexchange.com/a/3334866
        const direction = vec3.create()
        vec3.cross(direction, other.direction, this.direction)
        vec3.normalize(direction, direction)
        const rhs = vec3.create()
        vec3.subtract(rhs, other.position, this.position)
        const otherDirection = vec3.clone(other.direction)
        vec3.negate(otherDirection, otherDirection)
        const lhs = mat3.create()
        lhs.set(this.direction)
        lhs.set(otherDirection, 3)
        lhs.set(direction, 6)
        mat3.transpose(lhs, lhs)
        mat3.invert(lhs, lhs)
        vec3.transformMat3(rhs, rhs, lhs)
        return rhs
    }
}
