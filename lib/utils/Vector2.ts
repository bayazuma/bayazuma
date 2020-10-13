// 参考 https://gist.github.com/Dalimil/3daf2a0c531d7d030deb37a7bfeff454
// divがなかったので足してます

class Vector2 {
  x: number
  y: number
  constructor(x?: number, y?: number) {
    this.x = x === undefined ? 0 : x
    this.y = y === undefined ? 0 : y
  }

  set(x: number, y: number): void {
    this.x = x || 0
    this.y = y || 0
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y)
  }

  add(vector: Vector2): Vector2 {
    return new Vector2(this.x + vector.x, this.y + vector.y)
  }

  subtract(vector: Vector2): Vector2 {
    return new Vector2(this.x - vector.x, this.y - vector.y)
  }

  scale(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar)
  }

  div(scalar: number): Vector2 {
    return new Vector2(this.x / scalar, this.y / scalar)
  }

  dot(vector: Vector2): number {
    return this.x * vector.x + this.y + vector.y
  }

  moveTowards(vector: Vector2, t: number): Vector2 {
    // Linearly interpolates between vectors A and B by t.
    // t = 0 returns A, t = 1 returns B
    t = Math.min(t, 1) // still allow negative t
    const diff = vector.subtract(this)
    return this.add(diff.scale(t))
  }

  magnitude(): number {
    return Math.sqrt(this.magnitudeSqr())
  }

  magnitudeSqr(): number {
    return this.x * this.x + this.y * this.y
  }

  distance(vector: Vector2): number {
    return Math.sqrt(this.distanceSqr(vector))
  }

  distanceSqr(vector: Vector2): number {
    const deltaX = this.x - vector.x
    const deltaY = this.y - vector.y
    return deltaX * deltaX + deltaY * deltaY
  }

  normalize(): Vector2 {
    const mag = this.magnitude()
    const vector = this.clone()
    if (Math.abs(mag) < 1e-9) {
      vector.x = 0
      vector.y = 0
    } else {
      vector.x /= mag
      vector.y /= mag
    }
    return vector
  }

  angle(): number {
    return Math.atan2(this.y, this.x)
  }

  rotate(alpha: number): Vector2 {
    const cos = Math.cos(alpha)
    const sin = Math.sin(alpha)
    const vector = new Vector2()
    vector.x = this.x * cos - this.y * sin
    vector.y = this.x * sin + this.y * cos
    return vector
  }

  toPrecision(precision: number): { x: string; y: string } {
    const vector = this.clone()
    const x = vector.x.toFixed(precision)
    const y = vector.y.toFixed(precision)
    return { x, y }
  }

  toString(): string {
    const vector = this.toPrecision(1)
    return '[' + vector.x + '; ' + vector.y + ']'
  }
}

export default Vector2
