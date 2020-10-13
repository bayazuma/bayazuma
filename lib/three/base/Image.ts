import * as THREE from 'three'
import ThreeComponent from '../core/Component'

class Image extends ThreeComponent {
  texture: THREE.Texture

  constructor(texture: THREE.Texture) {
    super()
    this.texture = texture
    this.init()
  }

  vertex(): void {
    this.geometry = new THREE.PlaneGeometry(1, 1)
  }

  status(): void {
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      // opacity: 0.5,
    })
    // this.material = new THREE.MeshPhongMaterial({ map: this.texture })
  }

  program(): void {
    this.object = new THREE.Mesh(this.geometry, this.material)
    this.object.rotateZ(Math.PI * 2)
  }

  setScale(scale: number): void {
    // 縦横比を保ってリサイズ
    const w = scale
    const h = this.texture.image.height / (this.texture.image.width / w)
    this.object?.scale.set(w, h, 1)
  }

  update(time: number): void {
    //
  }
}

export default Image
