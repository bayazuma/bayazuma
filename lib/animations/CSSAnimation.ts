class CSSAnimation {
  el: HTMLElement
  name: string
  prefix: string
  isPlaying: boolean
  hasOn: boolean
  onCount: number
  offCount: number
  onComplete?: () => void
  onStart?: () => void

  // アニメーション前に animationをwill-change
  static setWillChange(el: HTMLElement, value: string): void {
    el.style.willChange = value // ex: 'transform, opacity'
  }

  // アニメーション後に will-change を外す
  static removeWillChange(el: HTMLElement): void {
    el.style.willChange = 'auto'
  }

  constructor(props: {
    el: HTMLElement
    name: string
    prefix?: string
    onComplete?: () => void
    onStart?: () => void
  }) {
    this.el = props.el
    this.name = props.name
    this.prefix = props.prefix || 'i-'

    if (props.onComplete) {
      this.onComplete = props.onComplete
    }
    if (props.onStart) {
      this.onStart = props.onStart
    }

    this.isPlaying = false
    this.hasOn = false
    this.onCount = 0
    this.offCount = 0

    this.init()
    this.eventAttach()
  }

  init(): void {
    this.el.classList.add(`${this.prefix}${this.name}`)
    this.el.classList.add('ready')
  }

  eventAttach(): void {
    // アニメーション実行中か
    this.el.addEventListener('animationstart', (e) => {
      this.isPlaying = true
      this.onStart && this.onStart()
    })
    this.el.addEventListener('animationend', (e) => {
      this.isPlaying = false
      this.onComplete && this.onComplete()
    })
  }

  clear(): void {
    this.el.classList.remove('ready')
    this.el.classList.remove('on')
    this.el.classList.remove('off')
    this.el.classList.remove('onBack')
    this.el.classList.remove('offBack')
  }

  on(): void {
    if (this.onCount > 0 && this.hasOn === true) {
      return
    }
    this.clear()
    this.el.classList.add('on')
    this.hasOn = true
    this.onCount += 1
  }

  onBack(): void {
    this.clear()
    this.el.classList.add('onBack')
    // this.hasOn = true
    // this.onCount += 1
  }

  off(): void {
    if (this.offCount > 0 && this.hasOn === false) {
      return
    }
    this.clear()
    this.el.classList.add('off')
    this.hasOn = false
    this.offCount += 1
  }

  offBack(): void {
    this.clear()
    this.el.classList.add('offBack')
  }
}

export default CSSAnimation
