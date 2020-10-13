type Value = number | string

class StyleTransform {
  static translate3d(el: HTMLElement, t: Value, n: Value, r: Value): void {
    el.style.transform = `perspective(1000px) translate3d(${t}px,${n}px,${r}px)`
  }

  static rotate(el: HTMLElement, t: Value, n: Value): void {
    if (n < 0.8 && (n = 0)) {
      el.style.transform = `perspective(1000px) translate3d(0,0,${n}px) rotate(${t}deg)`
    }
  }

  static zoom(el: HTMLElement, t: Value): void {
    if (t < 0.8 && (t = 0)) {
      el.style.transform = `perspective(1000px) translate3d(0,0,${t}px)`
    }
  }
}

export default StyleTransform
