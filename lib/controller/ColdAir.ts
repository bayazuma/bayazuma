import { Loaded } from '../loaders/ImageLoader'

import ThreeMain from '../three/core/System'
import Light from '../three/base/Light'
import Guide from '../three/base/Guide'
import Particles from '../three/Particles'
import Origin from '../three/base/Origin'

class ColdAir {
  world: ThreeMain
  particles?: Particles
  masterTl?: TimelineMax

  constructor(el: HTMLCanvasElement, loadedList?: Loaded[]) {
    this.world = new ThreeMain(el, loadedList)
    this.createWorld()
    this.createTimeline()
  }

  createWorld(): void {
    const { x, y, z, particle } = this.world.textures!
    const w = window.innerWidth
    const h = window.innerHeight

    const light = new Light()
    this.world.addLight(light)
    this.world.addContainer(light.container)

    const guide = new Guide(x, y, z)
    this.world.addComponent('guide', guide)
    this.world.addContainer(guide.container)

    const origin = new Origin()
    this.world.addComponent('origin', origin)
    this.world.addContainer(origin.container)

    this.particles = new Particles(particle)
    this.world.addComponent('particles', this.particles)
    this.world.addContainer(this.particles.container)

    this.world.setScene()
    this.world.onResize(w, h)
  }

  createTimeline(): void {
  }

  start(): void {
    this.world.start()
  }

  stop(): void {
    this.world.stop()
  }

  play(): void {
    this.world.componentList.particles.param!.speed = -0.04
  }

  pause(): void {
    this.world.componentList.particles.param!.speed = 0.0
  }
}

export default ColdAir
