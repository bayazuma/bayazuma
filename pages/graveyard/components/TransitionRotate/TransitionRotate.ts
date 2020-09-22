import gsap from 'gsap'
import Calc from '../../../../lib/utils/Calc'

class TransitionRotate {
  el: HTMLElement
  container: HTMLElement
  items: NodeListOf<Element>
  masterTl?: gsap.core.Timeline

  constructor(el: HTMLElement) {
    this.el = el
    this.container = this.el.querySelector('.js-container')
    this.items = this.el.querySelectorAll('.js-item')
    this.createTimeline()
  }

  createTimeline(): void {
    this.items.forEach((item, index) => {
      // const degree = ((index * 1) / blocks.length) * 360
      // const radian = degree * (Math.PI / 180)
      const radian = index / this.items.length
      const radianm = Calc.map(radian, 0, 1, 0, 2 * Math.PI)
      // console.log(degree, radian, radianm)
      const r = 5000
      const center = -5000
      const x = center + Math.cos(radianm) * r
      const y = Math.sin(radianm) * r

      gsap.set(item, {
        x: x,
        y: y,
      })
    })
  }

  next(nextRad: number): Promise<string> {
    return new Promise((resolve) => {
      const tl = gsap.timeline()
      const tweenList: gsap.core.Tween[] = []
      const r = 5000
      const center = -5000

      this.items.forEach((item, index) => {
        const radian = index / this.items.length
        const radianm = Calc.map(radian, 0, 1, 0, 2 * Math.PI)
        const x = center + Math.cos(radianm + nextRad) * r
        const y = Math.sin(radianm + nextRad) * r

        const tween = gsap.to(item, {
          x: x,
          y: y,
          duration: 0.8,
        })
        tweenList.push(tween)
      })
      tl.to(this.container, {
        z: r * -0.9,
        duration: 0.4,
      })
      tl.add(tweenList)
      tl.to(this.container, {
        z: 0,
        duration: 0.4,
        onComplete: () => {
          resolve('onComplete')
        },
      })
    })
  }

  previous(): void {
    if (this.masterTl) {
      this.masterTl.tweenTo(this.masterTl.previousLabel())
    }
  }
}

export default TransitionRotate
