/**
 * Represents a 3D vector for coordinate manipulation.
 */
class Vector3 {
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Calculate the distance to another vector.
     * @param {Vector3} v 
     * @returns {number}
     */
    distanceTo(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        const dz = this.z - v.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    /**
     * Add another vector to this one.
     * @param {Vector3} v 
     * @returns {Vector3}
     */
    add(v) {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    /**
     * Simplified array output for CFX natives.
     * @returns {number[]}
     */
    toArray() {
        return [this.x, this.y, this.z];
    }
}

/**
 * Represents a 2D vector for coordinate manipulation.
 */
class Vector2 {
    /**
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Calculate the distance to another vector.
     * @param {Vector2} v 
     * @returns {number}
     */
    distanceTo(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Add another vector to this one.
     * @param {Vector2} v 
     * @returns {Vector2}
     */
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    /**
     * Simplified array output for CFX natives.
     * @returns {number[]}
     */
    toArray() {
        return [this.x, this.y];
    }
}

export { Vector3, Vector2 };
