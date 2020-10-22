import { Loaded } from '../loaders/ImageLoader'

import ThreeMain from '../three/core/System'
import Light from '../three/base/Light'
import Guide from '../three/base/Guide'
import FrozenThree from '../three/Frozen'

class Freezer {
  world: ThreeMain
  frozen?: FrozenThree
  masterTl?: TimelineMax

  constructor(el: HTMLCanvasElement, loadedList?: Loaded[]) {
    this.world = new ThreeMain(el, loadedList)
    this.createWorld()
    this.createTimeline()
  }

  createWorld(): void {
    const { x, y, z, kuma, kumask } = this.world.textures!
    const w = window.innerWidth
    const h = window.innerHeight

    const light = new Light()
    this.world.addLight(light)
    this.world.addContainer(light.container)

    const guide = new Guide(x, y, z)
    this.world.addComponent('guide', guide)
    this.world.addContainer(guide.container)

    this.frozen = new FrozenThree(kuma, kumask)
    this.world.addComponent('frozen', this.frozen)
    this.world.addContainer(this.frozen.container)

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
    this.frozen && this.frozen.progress(val)
  }
}

export default Freezer
