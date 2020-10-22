import * as THREE from 'three'
import ThreeComponent, { Param } from '../core/Component'

class Particles extends ThreeComponent {
  texture: THREE.Texture
  private vertNum: number
  private attrNum: number

  constructor(texture: THREE.Texture) {
    super()
    this.texture = texture

    // パーティクル数
    this.vertNum = 900
    this.attrNum = 3

    this.param = {
      speed: 0.0,
      y: 22,
      opacity: 0.3,
    }

    this.init()
    this.setParam()
  }

  vertex(): void {
    this.geometry = new THREE.BufferGeometry()

    // 頂点数 * 属性数
    const vertices = new Float32Array(this.vertNum * this.attrNum)
    let i = 0
    let index = 0

    const surfaceCnt = 4
    const baseDistance = 450
    const amp = 14
    let cnt = 0
    for (i = 0; i < this.vertNum; i += 1) {
      index = i * this.attrNum
      const surface = cnt % surfaceCnt

      // position
      // vertices[index + 0] = (Math.random() * 2 - 1) * 100
      // vertices[index + 1] = (Math.random() * 2 - 1) * 100
      // vertices[index + 2] = (Math.random() * 2 - 1) * 100

      let x = 0
      let y = 0
      let z = 0
      switch (surface) {
        case 0:
          x = (Math.random() * 2 - 1) * baseDistance
          y = (Math.random() * 2 - 1) * baseDistance
          z = baseDistance + (Math.random() * 2 - 1) * amp
          break
        case 1:
          x = (Math.random() * 2 - 1) * baseDistance
          y = baseDistance + (Math.random() * 2 - 1) * amp
          z = (Math.random() * 2 - 1) * baseDistance
          break
        case 2:
          x = (Math.random() * 2 - 1) * baseDistance
          y = (Math.random() * 2 - 1) * baseDistance
          z = -1 * baseDistance + (Math.random() * 2 - 1) * amp
          break
        case 3:
          x = (Math.random() * 2 - 1) * baseDistance
          y = -1 * baseDistance + (Math.random() * 2 - 1) * amp
          z = (Math.random() * 2 - 1) * baseDistance
          break
        default:
          break
      }
      vertices[index + 0] = x
      vertices[index + 1] = y
      vertices[index + 2] = z

      cnt += 1
    }
    this.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(vertices, 3)
    )
    // とりあえず1/4ぐらいだけ描画
    this.geometry.drawRange.count = this.vertNum * 0.25
  }

  status(): void {
    this.material = new THREE.PointsMaterial({
      map: this.texture,
      transparent: true,
      depthWrite: false,
      size: 40,
      color: '#00A1E9',
    })
  }

  program(): void {
    this.object = new THREE.Points(this.geometry, this.material)
  }

  setParam(param?: Param): void {
    if (param) {
      this.param = param
    }
    if (this.object) {
      this.object.position.y += this.param!.y
    }
    if (this.material) {
      this.material.opacity = this.param!.opacity
    }
  }

  update(time: number): void {
    if (this.object && this.param) {
      this.object.rotation.x += this.param.speed
    }
  }
}

export default Particles
