import * as THREE from 'three'
import ThreeComponent from '../core/Component'

class Cone extends ThreeComponent {
  constructor() {
    super()
    this.init()
  }

  vertex(): void {
    // radius, height, rseg, hseg, openend
    this.geometry = new THREE.ConeBufferGeometry(2, 8, 8, 1, true)
  }

  status(): void {
    this.material = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xffcc33,
    })
  }

  program(): void {
    this.object = new THREE.Mesh(this.geometry, this.material)
  }

  update(): void {
    //
  }
}

export default Cone
