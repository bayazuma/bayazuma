import * as THREE from 'three'
import vertexShader from '../../../lib/shaders/frozen.vert'
import fragmentShader from '../../../lib/shaders/frozen.frag'
import ThreeComponent from '../core/Component'

class Frozen extends ThreeComponent {
  texture: THREE.Texture
  textureMask: THREE.Texture

  constructor(texture: THREE.Texture, textureMask: THREE.Texture) {
    super()
    this.texture = texture
    this.textureMask = textureMask
    this.init()
  }

  vertex(): void {
    const aspect = 512 / 512 // 画像の縦横
    this.geometry = new THREE.PlaneBufferGeometry(
      window.innerWidth * 0.5,
      window.innerHeight * 1.0,
      28,
      28
    )
  }

  status(): void {
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_uneven_scale: { value: 50.0 },
        u_texture: { value: this.texture },
        u_texture_mask: { value: this.textureMask },
        u_time: { value: 0.0 },
        u_noise_scale: { value: 57.0 },
        u_blend_opacity: { value: 0.5 },
        u_mix_opacity: { value: 0.5 },
      },
    })
    // this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  }

  program(): void {
    this.object = new THREE.Mesh(this.geometry, this.material)
    this.object.position.x = window.innerWidth * 0.25
  }

  update(time: number): void {
    // TODO interfaceにする
  }

  progress(val: number): void {
    if (this.material) {
      ;(this
        .material as THREE.ShaderMaterial).uniforms.u_mix_opacity.value = val
    }
  }
}

export default Frozen
