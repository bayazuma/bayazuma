import * as THREE from 'three'
import ThreeComponent from '../core/Component'

const _D2R = Math.PI / 180 // Degrees to Radians

class Camera extends ThreeComponent {
  boxGeometry?: THREE.Geometry | THREE.BufferGeometry
  box2Geometry?: THREE.Geometry | THREE.BufferGeometry
  cylinderGeometry?: THREE.Geometry | THREE.BufferGeometry
  box?: THREE.Mesh
  box2?: THREE.Mesh
  cylinder?: THREE.Mesh
  constructor() {
    super()
    this.init()
  }

  init() {
    this.vertex()
    this.status()
    this.program()
    this.container.add(this.box!)
    this.container.add(this.box2!)
    this.container.add(this.cylinder!)
  }

  vertex() {
    this.boxGeometry = new THREE.BoxBufferGeometry(3, 2, 1)
    this.box2Geometry = new THREE.BoxBufferGeometry(1, 0.5, 0.5)
    this.cylinderGeometry = new THREE.CylinderBufferGeometry(0.5, 0.75, 1, 16)
  }

  status() {
    const color = 0x0099cc
    this.material = new THREE.MeshPhongMaterial({
      color,
      emissive: color,
    })
  }

  program() {
    this.box = new THREE.Mesh(this.boxGeometry, this.material)
    this.box2 = new THREE.Mesh(this.box2Geometry, this.material)
    this.box2.position.set(0, 1.25, 0)
    this.cylinder = new THREE.Mesh(this.cylinderGeometry, this.material)
    this.cylinder.rotation.x = _D2R * 90
    this.cylinder.position.set(0, 0, -1)
  }

  update() {
    //
  }
}

export default Camera
