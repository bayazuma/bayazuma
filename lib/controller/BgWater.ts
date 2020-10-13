import { Loaded } from '../loaders/ImageLoader'

import ThreeMain from '../three/core/System'
import Light from '../three/base/Light'
import Guide from '../three/base/Guide'
import Water2D from '../three/Water2D'

class BgWater {
  world: ThreeMain
  water2D?: Water2D
  masterTl?: TimelineMax

  constructor(el: HTMLCanvasElement, loadedList?: Loaded[]) {
    this.world = new ThreeMain(el, loadedList)
    this.createWorld()
    this.createTimeline()
  }

  createWorld(): void {
    const { x, y, z } = this.world.textures!
    const w = window.innerWidth
    const h = window.innerHeight

    const light = new Light()
    this.world.addLight(light)
    this.world.addContainer(light.container)

    const guide = new Guide(x, y, z)
    this.world.addComponent('guide', guide)
    this.world.addContainer(guide.container)

    this.water2D = new Water2D()
    this.world.addComponent('water2D', this.water2D)
    this.world.addContainer(this.water2D.container)

    this.world.setScene()
    this.world.onResize(w, h)
  }

  createTimeline(): void {
  }

  play(): void {
    this.start()
  }

  pause(): void {
    this.stop()
  }

  start(): void {
    this.world.start()
  }

  stop(): void {
    this.world.stop()
  }

  progress(val: number): void {
    this.water2D && this.water2D.progress(val)
  }
}

export default BgWater
