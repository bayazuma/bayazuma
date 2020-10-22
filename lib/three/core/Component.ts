import * as THREE from 'three'

export type Param = {
  [porp: string]: number
}

abstract class ThreeComponent {
  container: THREE.Object3D
  geometry?: THREE.Geometry | THREE.BufferGeometry
  material?: THREE.Material | THREE.ShaderMaterial | THREE.PointsMaterial
  object?: THREE.Mesh | THREE.Points
  param?: Param

  constructor() {
    this.container = new THREE.Object3D()
    this.geometry
    this.material
    this.object
    this.param
  }

  init(): void {
    this.vertex()
    this.status()
    this.program()
    this.object && this.container.add(this.object)
  }

  abstract vertex(): void
  abstract status(): void
  abstract program(): void
  abstract update(time: number): void
  // abstract setParam(param: Param): void
}

export default ThreeComponent
