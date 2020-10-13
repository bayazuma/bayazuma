import * as THREE from 'three'
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
// import Stats from 'three/examples/jsm/libs/stats.module'

import Position from '../../utils/Position'
import AnimationFrame from '../../animations/AnimationFrame'

import CameraManager from './CameraManager'
import { Loaded } from '../../loaders/ImageLoader'
import ThreeComponent from '../core/Component'
import LightComponent from '../core/LightComponent'
import Dest from '../base/Dest'

type TextureType = {
  [prop: string]: THREE.Texture
}

type ComponentList = {
  [prop: string]: ThreeComponent
}

class ThreeMain {
  static createTextureByImgEl(img: HTMLImageElement): THREE.Texture {
    const texture = new THREE.Texture(img)
    texture.needsUpdate = true
    return texture
  }

  // static loadFBX(path: string): Promise<THREE.Group> {
  //   const loader = new FBXLoader()
  //   return new Promise<THREE.Group>((resolve) => {
  //     loader.load(path, (fbx) => {
  //       resolve(fbx)
  //     })
  //   })
  // }

  static createTextures(loadedList: Loaded[]): TextureType {
    const textures: TextureType = {}
    loadedList.forEach((item) => {
      textures[item.id] = new THREE.Texture(item.img)
      textures[item.id].needsUpdate = true
    })
    return textures
  }

  el: HTMLCanvasElement
  renderer: THREE.WebGLRenderer
  baseScene: THREE.Scene
  baseContainer: THREE.Object3D
  postScene: THREE.Scene
  postContainer: THREE.Object3D
  postDest: Dest
  mouse: Position
  clock: THREE.Clock
  time: number
  cm: CameraManager
  textures?: TextureType
  renderTarget: THREE.WebGLRenderTarget
  componentList: ComponentList
  lightList: LightComponent[]
  // stats: Stats
  af: AnimationFrame

  constructor(el: HTMLCanvasElement, loadedList?: Loaded[]) {
    const w = window.innerWidth
    const h = window.innerHeight

    this.el = el

    // レンダラー作成
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.el,
      alpha: true,
      antialias: true,
      stencil: false,
      depth: true,
      premultipliedAlpha: false,
    })
    this.renderer.setClearColor(0xffffff, 0.2)
    // this.renderer.setClearColor(0x000000, 1.0)

    // メイン処理実装用
    this.baseScene = new THREE.Scene()
    this.baseContainer = new THREE.Object3D()

    // オフスクリーン(表示用)
    this.postScene = new THREE.Scene()
    this.postContainer = new THREE.Object3D()

    // ライト一覧
    this.lightList = []

    // コンポーネント一覧
    this.componentList = {}

    // マウス情報
    this.mouse = new Position(0, 0)

    // 時間管理
    this.clock = new THREE.Clock(false) // autostart false
    this.time = 0

    // テクスチャ準備
    if (loadedList) {
      this.textures = ThreeMain.createTextures(loadedList)
    }

    // カメラ設置
    this.cm = new CameraManager(w, h, this.el)
    this.addContainer(this.cm.container)

    // オフスクリーン(表示用)
    this.renderTarget = new THREE.WebGLRenderTarget(w, h)
    this.postDest = new Dest(this.renderTarget.texture) // renderTargetのテクスチャを紐付けて、渡しておく
    this.addComponent('dest', this.postDest)
    this.addOffscreenContainer(this.postDest.container)

    this.animate = this.animate.bind(this)
    this.af = new AnimationFrame(this.animate)

    // this.stats = Stats()
    // this.stats.showPanel(0)
  }

  // update用のコンポーネント
  addComponent(id: string, component: ThreeComponent): void {
    this.componentList[id] = component
  }

  // update用のライトコンポーネント(ライトは普通のコンポーネントと処理が異なる可能性があるため別に分けている)
  addLight(light: LightComponent): void {
    this.lightList.push(light)
  }

  // メイン処理のシーンに追加するオブジェクト追加
  addContainer(container: THREE.Object3D): void {
    this.baseContainer.add(container)
  }

  // ポストエフェクト処理のシーンに追加するオブジェクト追加(基本表示用の四角しかきません)
  addOffscreenContainer(container: THREE.Object3D): void {
    this.postContainer.add(container)
  }

  // 全てのオブジェクトをシーンへ追加
  setScene(): void {
    this.baseScene.add(this.baseContainer)
    this.postScene.add(this.postContainer)
  }

  // 各コンポーネントの更新処理
  update(): void {
    const delta = this.clock.getDelta() // 差分
    this.time += delta // 差分を足して経過時間を作成(stop対応用)
    // const elapsed = this.clock.getElapsedTime() // 経過時間

    this.lightList.forEach((light) => {
      light.update(this.time)
    })
    Object.keys(this.componentList).forEach((id) => {
      this.componentList[id].update(this.time)
    })

    this.cm.update()
  }

  // 描画
  animate(): void {
    // this.stats.begin()

    this.update()

    // オフスクリーンなし版
    this.renderer.render(this.baseScene, this.cm.activeCamera)

    // // オフスクリーンあり版
    // // renderTargetを設定して、メイン処理情報(シーンとカメラ)をレンダリングしてtextureに書き出す
    // this.renderer.setRenderTarget(this.renderTarget)
    // this.renderer.setClearColor(new THREE.Color(0x000000), 1.0)
    // this.renderer.render(this.baseScene, this.cm.activeCamera)
    // this.renderer.setRenderTarget(null)

    // // textureを表示したdestを大元でレンダリング
    // this.renderer.render(this.postScene, this.cm.list.post)

    // this.stats.end()
  }

  start(): void {
    this.clock.start()
    this.af && this.af.start()
  }

  stop(): void {
    this.clock.stop()
    this.af && this.af.stop()
  }

  onResize(w: number, h: number): void {
    this.cm.resize(w, h)
    this.renderer.setPixelRatio(window.devicePixelRatio || 1)
    this.renderer.setSize(w, h, true)
    this.renderer.clear()
  }

  onMouse(mouse: Position): void {
    this.mouse = mouse
  }
}

export default ThreeMain
