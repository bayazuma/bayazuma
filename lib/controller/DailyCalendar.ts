import gsap from 'gsap'
import Calc from '../utils/Calc'

class DailyCalendar {
  el: HTMLElement
  body: HTMLElement
  day10: HTMLElement
  day20: HTMLElement
  day25: HTMLElement
  day30: HTMLElement
  tweenBody?: gsap.core.Tween
  tween1?: gsap.core.Tween
  tween10?: gsap.core.Tween
  tween20?: gsap.core.Tween
  tween25?: gsap.core.Tween
  tween30?: gsap.core.Tween

  constructor(el: HTMLElement) {
    this.el = el
    this.body = this.el.querySelector('.js-body') as HTMLElement
    this.day10 = this.el.querySelector('.js-day10') as HTMLElement
    this.day20 = this.el.querySelector('.js-day20') as HTMLElement
    this.day25 = this.el.querySelector('.js-day25') as HTMLElement
    this.day30 = this.el.querySelector('.js-day30') as HTMLElement
    this.createTimeline()
  }

  createTimeline(): void {
    this.tweenBody = gsap.to(this.el, {
      scale: 0.65,
      ease: 'power1.out',
      paused: true,
      duration: 0.2,
    })

    this.tween10 = gsap.to(this.day10.children, {
      yPercent: -200,
      xPercent: 'random(-50, 50)',
      autoAlpha: 0,
      stagger: {
        // each: 0.08,
        from: 'end',
        amount: 0.6,
      },
      ease: 'power3.out',
      paused: true,
    })
    this.tween20 = gsap.to(this.day20.children, {
      yPercent: -200,
      xPercent: 'random(-50, 50)',
      autoAlpha: 0,
      stagger: {
        // each: 0.08,
        from: 'end',
        amount: 0.6,
      },
      ease: 'power3.out',
      paused: true,
    })
    this.tween25 = gsap.to(this.day25.children, {
      yPercent: -200,
      xPercent: 'random(-50, 50)',
      autoAlpha: 0,
      stagger: {
        // each: 0.08,
        from: 'end',
        amount: 0.6,
      },
      ease: 'power3.out',
      paused: true,
    })
    this.tween30 = gsap.to(this.day30.children, {
      yPercent: -200,
      xPercent: 'random(-50, 50)',
      autoAlpha: 0,
      stagger: {
        // each: 0.08,
        from: 'end',
        amount: 0.6,
      },
      ease: 'power3.out',
      paused: true,
    })
  }

  zoomOut(): void {
    this.tweenBody && this.tweenBody.play()
  }

  zoomIn(): void {
    this.tweenBody && this.tweenBody.reverse()
  }

  play1(): void {
    // this.tween1 && this.tween1.play()
  }
  play10(callback: () => void): void {
    this.tweenBody &&
      this.tweenBody.play().then(() => {
        this.tween10 &&
          this.tween10.play().then(() => {
            this.tweenBody?.reverse()
            callback && callback()
          })
      })
  }
  play20(callback: () => void): void {
    this.tweenBody &&
      this.tweenBody.play().then(() => {
        this.tween20 &&
          this.tween20.play().then(() => {
            this.tweenBody?.reverse()
            callback && callback()
          })
      })
  }
  play25(callback: () => void): void {
    this.tweenBody &&
      this.tweenBody.play().then(() => {
        this.tween25 &&
          this.tween25.play().then(() => {
            this.tweenBody?.reverse()
            callback && callback()
          })
      })
  }
  play30(): void {
    this.tweenBody &&
      this.tweenBody.play().then(() => {
        this.tween30 &&
          this.tween30.play().then(() => {
            this.tweenBody?.reverse()
          })
      })
  }
  reverse30(): void {
    this.tweenBody &&
      this.tweenBody.play().then(() => {
        this.tween30 &&
          this.tween30.reverse().then(() => {
            this.tweenBody?.reverse()
          })
      })
  }
  reverse25(): void {
    this.tweenBody &&
      this.tweenBody.play().then(() => {
        this.tween25 &&
          this.tween25.reverse().then(() => {
            this.tweenBody?.reverse()
          })
      })
  }
  reverse20(): void {
    this.tweenBody &&
      this.tweenBody.play().then(() => {
        this.tween20 &&
          this.tween20.reverse().then(() => {
            this.tweenBody?.reverse()
          })
      })
  }
  reverse10(): void {
    this.tweenBody &&
      this.tweenBody.play().then(() => {
        this.tween10 &&
          this.tween10.reverse().then(() => {
            this.tweenBody?.reverse()
          })
      })
  }
}

export default DailyCalendar
