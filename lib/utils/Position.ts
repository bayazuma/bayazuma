import Vector from './Vector2'

export enum DirectionX {
  STAY,
  RIGHT,
  LEFT,
}

export enum DirectionY {
  STAY,
  UP,
  DOWN,
}

class Position {
  vector: Vector
  direction: { x: DirectionX; y: DirectionY }
  constructor(x: number, y: number) {
    this.vector = new Vector(x, y)
    this.direction = {
      x: DirectionX.STAY,
      y: DirectionY.STAY,
    }
  }

  get x(): number {
    return this.vector.x
  }

  get y(): number {
    return this.vector.y
  }

  set(x?: number, y?: number): void {
    if (x != null) {
      this.vector.x = x
    }
    if (y != null) {
      this.vector.y = y
    }
  }
}

export default Position
