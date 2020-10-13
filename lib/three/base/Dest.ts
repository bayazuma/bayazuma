import * as THREE from 'three'

import vertexShader from '../../shaders/post.vert'
import fragmentShader from '../../shaders/post.frag'
import ThreeComponent from '../core/Component'

// import paramDecorator from './paramDecorator'

class Dest extends ThreeComponent {
  texture: THREE.Texture

  constructor(texture: THREE.Texture) {
    super()
    this.texture = texture
    this.init()
  }

  vertex(): void {
    const aspect = window.innerHeight / window.innerWidth // TOOD: 横長想定で一時的に入れてるので、要調整
    this.geometry = new THREE.PlaneBufferGeometry(1, 1 * aspect)
  }

  status(): void {
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        tDiffuse: { value: this.texture },
        time: { value: 0 },
        brightness: { value: 0 },
        contrastR: { value: 0 },
        contrastG: { value: 0 },
        contrastB: { value: 0 },
        lineScaleR: { value: 0 },
        lineScaleG: { value: 0 },
        lineScaleB: { value: 0 },
        discardAlpha: { value: 0 },
        u_ripple_strength: { value: 0 },
        u_ripple_offset: { value: 0 },
        u_ripple_frequency: { value: 0 },
        u_ripple_center_uv_x: { value: 0 },
        u_ripple_center_uv_y: { value: 0 },
        u_ripple_sine_disappear_distance: { value: 1 },
      },
    })
    // this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  }

  program(): void {
    this.object = new THREE.Mesh(this.geometry, this.material)
  }

  update(time: number): void {
    // TODO interfaceにする
  }

  // resize() {
  // }
}

export default Dest
// export default paramDecorator(Dest);
