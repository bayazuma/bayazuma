import * as THREE from 'three'
import ThreeComponent from '../core/Component'

class Origin extends ThreeComponent {
  constructor() {
    super()
    this.init()
  }

  vertex(): void {
    this.geometry = new THREE.BoxGeometry(1, 1, 1)
  }

  status(): void {
    // this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    // this.material = new THREE.MeshNormalMaterial()
    // this.material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
    this.material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    // this.material = new THREE.MeshToonMaterial({color: 0x00ff00})
    // this.material = new THREE.MeshStandardMaterial({color: 0x00ff00, roughness:0.5})
  }

  program(): void {
    this.object = new THREE.Mesh(this.geometry, this.material)
    this.object.position.set(0, 1, 0)
    // this.object.visible = true
  }

  update(time: number): void {
    //
  }

  //
  // resize() {
  // }
  //
  // mouse() {
  // }
}

export default Origin
