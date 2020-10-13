// const MAX_FPS = 60

class AnimationFrame {
  requestId?: number | null
  updateFn: () => void
  constructor(updateFn: () => void) {
    this.anim = this.anim.bind(this)
    this.updateFn = updateFn
  }

  start(): void {
    if (!this.requestId) {
      this.requestId = requestAnimationFrame(this.anim)
    }
  }

  anim(): void {
    this.updateFn()

    // setTimeout(() => {
    //   this.requestId = this.requestId ? requestAnimationFrame(this.anim) : null
    // }, 1000 / MAX_FPS)

    this.requestId = this.requestId ? requestAnimationFrame(this.anim) : null
  }

  stop(): void {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId)
      this.requestId = null
    }
  }
}

export default AnimationFrame
