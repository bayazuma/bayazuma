export interface Loaded {
  id: string
  img: HTMLImageElement
}

class ImageLoader {
  queue: string[]
  progress: number
  onProgress?: (progress: number) => void

  constructor(onProgress?: (progress: number) => void) {
    this.queue = []
    this.progress = 0
    this.onProgress = onProgress
    this.handleOnProgress = this.handleOnProgress.bind(this)
  }

  add(src: string): void {
    if (!src) return
    this.queue.push(src)
  }

  addList(list: string[]): void {
    this.queue = [...this.queue, ...list]
  }

  addByDom(selector: string): void {
    document.querySelectorAll(selector).forEach((el) => {
      const imgEl = el as HTMLImageElement
      let src = imgEl.src

      // srcset対応
      imgEl.srcset &&
        imgEl.srcset.split(',').map((url) => {
          const str = url.split(/\s+/)
          const imgDevicePixelRatio = str[str.length - 1]
          // デバイスピクセル比が同じ src をセット
          if (imgDevicePixelRatio === window.devicePixelRatio + 'x') {
            src = str[str.length - 2]
          }
        })
      this.add(src)
    })
  }

  has(): boolean {
    return this.queue.length > 0
  }

  start(): Promise<Loaded[]> {
    const promiseList = this.queue.map((src) => this.load(src))
    return this.loading(promiseList)
  }

  // // スクロール処理と連携して利用を想定. 未テスト
  // lazyLoad(imgEl: HTMLImageElement): void {
  //   imgEl.src = imgEl.dataset.src!
  //   imgEl.srcset = imgEl.dataset.srcset!
  //   imgEl.dataset.load = 'complete'

  //   // 読み込んだQueueを削除
  //   this.queue = this.queue.filter((image) => {
  //     return image !== image
  //   })
  // }

  private load(src: string): Promise<Loaded> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const file = src.match('.+/(.+?).[a-z]+([?#;].*)?$')
      let fileName = ''
      if (file && file.length >= 1) {
        fileName = file[1]
      }

      img.src = src
      img.addEventListener('load', (e) => {
        resolve({ id: fileName, img })
      })
      img.addEventListener('error', (e) => {
        reject()
      })
    })
  }

  private loading(promiseList: Array<Promise<any>>): Promise<Loaded[]> {
    let d = 0
    for (const p of promiseList) {
      p.then(() => {
        d++
        this.progress = d / promiseList.length
        this.handleOnProgress(this.progress)
      })
    }
    return Promise.all(promiseList)
  }

  private handleOnProgress(progress: number): void {
    this.onProgress && this.onProgress(progress)
  }
}

export default ImageLoader
