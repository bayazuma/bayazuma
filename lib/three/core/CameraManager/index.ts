import * as THREE from 'three'
import { gsap } from 'gsap'
import Debug from './debug'

type List = {
  [porp: string]: THREE.PerspectiveCamera
}

/**
 * ウィンドウとWebGLの座標を統一させる
 * WebGLの座標の単位をウィンドウと同じpxに統一します。
 *
 * https://qiita.com/watabo_shi/items/0811d03390c18e46be86
 */
@Debug()
class CameraManager {
  canvas: HTMLCanvasElement
  container: THREE.Object3D
  list: List
  fov: number
  aspect: number
  near: number
  far: number
  distance: number
  currentName: string
  activeCamera: THREE.PerspectiveCamera
  cameraTween?: gsap.core.Tween
  masterTween?: gsap.core.Tween
  constructor(w: number, h: number, canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.container = new THREE.Object3D()

    // 視野角
    this.fov = 60
    this.aspect = w / h
    this.distance = this.calcDistance(this.fov, h)
    this.near = 1
    this.far = this.distance * 2
    // this.far = this.distance * 0.8

    this.list = {
      main: new THREE.PerspectiveCamera(
        this.fov,
        this.aspect,
        this.near,
        this.far
      ),
      post: new THREE.PerspectiveCamera(
        this.fov,
        this.aspect,
        this.near,
        this.far
      ),
    }

    // カメラを収まる位置まで遠ざける
    this.list.main.position.set(0, 0, this.distance)
    this.list.post.position.set(0, 0, this.distance)

    this.currentName = 'main'
    this.activeCamera = this.list[this.currentName]

    this.updateCamera(w, h)
    this.createTimeline()
  }

  updateCamera(w: number, h: number): void {
    for (const [key, camera] of Object.entries(this.list)) {
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
  }

  createTimeline(): void {
    this.cameraTween = gsap.to(this.list.main.position, {
      duration: 20, // progressで利用する場合は関係なし
      z: '-=200',
      paused: true,
    })

    // delay cacth up (慣性)
    this.masterTween = gsap.to(this.cameraTween, {
      duration: 0.4, // 2秒遅延
      ease: 'power3',
      paused: true,
    })
  }

  updateMaster(progress?: number): void {
    if (progress) {
      // this.cameraTween && this.cameraTween.progress(progress)

      // delay cacth up (慣性)
      // progressの変数更新
      this.masterTween!.vars.progress = progress
      // 現在地を開始位置として、リスタート
      this.masterTween!.invalidate().restart()
    }
  }

  update(): void {
    //
  }

  resize(w: number, h: number): void {
    this.updateCamera(w, h)
  }

  // ウィンドウサイズの平面がぴったり収まるカメラ距離を計算
  private calcDistance(fov: number, h: number): number {
    // 視野角をラジアンに変換
    const fovRad = (fov / 2) * (Math.PI / 180)

    // 三角関数のtanの定義
    // Math.tan(fovRad)        = (height / 2) / distance; // 途中式
    // Math.tan(fovRad) * dist = (height / 2);        // 途中式
    return h / 2 / Math.tan(fovRad)
  }
}

export default CameraManager
