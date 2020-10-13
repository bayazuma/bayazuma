import Vector from "../utils/Vector2"

// const TOP_SPEED = 1; // トップスピード
const FRICTION_COEFFICIENT = 0.08 // 摩擦係数
const MASS = 1 // 質量

class Inertia {
  acceleration: Vector
  velocity: Vector
  location: Vector
  destination: Vector
  isAcctive: boolean // スクロールアニメーションまで完了しているか

  constructor() {
    // 基本 vector
    this.acceleration = new Vector()
    this.velocity = new Vector()
    this.location = new Vector()
    this.destination = new Vector()

    // フラグ
    this.isAcctive = false

    this.update = this.update.bind(this)
  }

  update(destination: Vector): void {
    this.destination = destination.clone()

    this.applyAttractionForce()

    // console.log('acc :', this.acceleration);
    // console.log('vel :', this.velocity);
    // console.log('loc :', this.location);
    // console.log('dest:', this.destination);

    this.velocity = this.velocity.add(this.acceleration)
    this.location = this.location.add(this.velocity)

    const diff = this.destination.subtract(this.location)

    // 差分が少なければ丸め込み
    if (Math.abs(diff.y) < 0.05) {
      this.location = this.destination.clone()
      this.isAcctive = false
    } else {
      this.isAcctive = true
    }

    // サイクル毎に速度と加速度をリセットします
    this.velocity = this.velocity.scale(0)
    this.acceleration = this.acceleration.scale(0)
  }

  private applyAttractionForce(): void {
    // 目的地までの差分 * ease;
    let dir = this.destination.subtract(this.location)
    dir = dir.scale(FRICTION_COEFFICIENT)
    this.applyForce(dir)

    // // 向き
    // let dir = this.destination.subtract(this.location);
    // dir = dir.normalize();

    // // 引力
    // let attraction = dir.scale(TOP_SPEED);
    // this.applyForce(attraction);

    // // 摩擦力
    // let friction = dir.scale(-1);
    // friction = friction.scale(FRICTION_COEFFICIENT);
    // this.applyForce(friction);
  }

  private applyForce(force: Vector): void {
    // Acceleration = Force / Mass
    const acceleration = force.div(MASS)
    this.acceleration = this.acceleration.add(acceleration)
  }
}

export default Inertia
