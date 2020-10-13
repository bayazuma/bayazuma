import * as THREE from 'three'

abstract class LightComponent {
  container: THREE.Object3D
  object?: THREE.Light

  constructor() {
    this.container = new THREE.Object3D()
    this.object
  }

  init(): void {
    this.object && this.container.add(this.object)
  }

  abstract create(): void

  abstract update(time: number): void
}

export default LightComponent
