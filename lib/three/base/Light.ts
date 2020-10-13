import * as THREE from 'three'
import LightComponent from '../core/LightComponent'
// import Debug from './Light.debug.dc'

// @Debug()
class Light extends LightComponent {
  constructor() {
    super()
    this.create()
    this.init()
  }

  create(): void {
    this.object = new THREE.DirectionalLight(0xffffff)
    this.object.position.set(0, 4, -7)
  }

  update(time: number): void {
    //
  }
}

export default Light
