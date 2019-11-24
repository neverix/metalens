import { vec3, quat, mat4 } from "gl-matrix"
import Ray from "./ray"

export default class Camera {
    /**
     * A simple orthographic camera.
     */

    matrix: mat4
    direction: vec3

    constructor(position: vec3, rotation: quat) {
        // Create a matrix to translate and rotate points
        this.matrix = mat4.create()
        mat4.fromQuat(this.matrix, rotation)
        mat4.translate(this.matrix, this.matrix, position)
        // Compute the normal
        this.direction = vec3.fromValues(0, 0, 1)
        vec3.transformQuat(this.direction, this.direction, rotation)
    }

    castRay(x: number, y: number) {
        /**
         * Casts a ray from the camera's surface into the world
         * @param x - The X coordinate of the point on the camera's surface
         * @param y - The Y coordinate of the point on the camera's surface
         */
        const point = vec3.fromValues(x, y, 0)
        vec3.transformMat4(point, point, this.matrix)
        return new Ray(point, this.direction)
    }
}