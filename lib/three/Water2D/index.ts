import * as THREE from 'three'
import vertexShader from '../../../lib/shaders/drip.vert'
import fragmentShader from '../../../lib/shaders/drip.frag'
import ThreeComponent from '../core/Component'

class Water2D extends ThreeComponent {
  constructor() {
    super()
    this.init()
  }

  vertex(): void {
    this.geometry = new THREE.PlaneBufferGeometry(
      0.5 * window.innerWidth,
      1.0 * window.innerHeight
    )
  }

  status(): void {
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0.0 },
        u_progress: { value: 0.5 },
        u_color: { value: new THREE.Vector3(0.4470588235294118, 0.6392156862745098, 0.8901960784313725) },
        u_resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      transparent: true,
    })
    // this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  }

  program(): void {
    this.object = new THREE.Mesh(this.geometry, this.material)
    this.object.position.x = window.innerWidth * 0.25
  }

  update(time: number): void {
    ;(this.material as THREE.ShaderMaterial).uniforms.u_time.value = time
  }

  progress(val: number): void {
    if (this.material) {
      ;(this.material as THREE.ShaderMaterial).uniforms.u_progress.value = val
    }
  }
}

export default Water2D
