import * as THREE from 'three'
import ThreeComponent from '../core/Component'
// import Debug from './Guide.debug.dc'

// @Debug()
class Guide extends ThreeComponent {
  gridHelper: THREE.GridHelper
  axesHelper: THREE.AxesHelper
  labelX: THREE.Sprite
  labelY: THREE.Sprite
  labelZ: THREE.Sprite
  constructor(x: THREE.Texture, y: THREE.Texture, z: THREE.Texture) {
    super()

    const gridSize = Math.max(window.innerWidth, window.innerHeight)
    const axesSize = gridSize / 2

    // 地面にグリッドを配置
    this.gridHelper = new THREE.GridHelper(gridSize, 10)
    // 描画順を1番目に調整
    this.gridHelper.renderOrder = -3
    // デプスを書き込まないので他のオブジェクトに上書きされる
    // this.gridHelper.material.depthWrite = false
    this.container.add(this.gridHelper)

    // 座標軸
    this.axesHelper = new THREE.AxesHelper(axesSize)
    // 描画順を2番目に最初に調整
    this.axesHelper.renderOrder = -2
    this.container.add(this.axesHelper)

    // X/Y/ZのlabelをSpriteで表示

    const xMat = new THREE.SpriteMaterial({
      map: x,
      color: 0xffffff,
    })
    const yMat = new THREE.SpriteMaterial({
      map: y,
      color: 0xffffff,
    })
    const zMat = new THREE.SpriteMaterial({
      map: z,
      color: 0xffffff,
    })

    this.labelX = new THREE.Sprite(xMat)
    this.labelX.position.set(axesSize, 0, 0)
    this.labelX.scale.set(20, 20, 20)

    this.labelY = new THREE.Sprite(yMat)
    this.labelY.position.set(0, axesSize, 0)
    this.labelY.scale.set(20, 20, 20)

    this.labelZ = new THREE.Sprite(zMat)
    this.labelZ.position.set(0, 0, axesSize)
    this.labelZ.scale.set(20, 20, 20)

    this.container.add(this.labelX)
    this.container.add(this.labelY)
    this.container.add(this.labelZ)
  }
  vertex(): void {
    //
  }

  status(): void {
    //
  }

  program(): void {
    //
  }

  update() {
    //
  }
}

export default Guide
