import React from "react"
import TransitionRotate from "../../lib/animations/TransitionRotate"

class TransitionRotatePage extends React.Component {
  anim: TransitionRotate
  state: { val: number }

  constructor(props: any) {
    super(props)
    this.state = { val: 1 }
  }

  componentDidMount() {
    const el = document.querySelector('[data-scene="TransitionRotate"]') as HTMLElement
    this.anim = new TransitionRotate(el)
  }

  next() {
    // const degree = ((index * 1) / blocks.length) * 360
    const degree = (this.state.val / 30) * 360
    const radian = degree * (Math.PI / 180)
    this.anim.next(radian)

    this.setState((state: { val: number }, props) => ({
      val: state.val + 5
    }));
  }

  render() {
    return (
      <div className="TransitionRotate" data-scene="TransitionRotate" onClick={() => this.next()}>
        <div className="TransitionRotate__container js-container">
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div> 
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div> 
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div> 
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
          <div className="TransitionRotate__block js-item">
            <img src="/images/profile.jpg" alt="" />
          </div>
        </div>
        <style jsx>{`
          .TransitionRotate {
            perspective: 1000px;
            width: 100%;
            height: 100vh;
            overflow: hidden;
          }
          .TransitionRotate__container {
            position: relative;
          }
          .TransitionRotate__block {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100vh;
          }
          .TransitionRotate__block img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}</style>
      </div>
    )
  }
}

export default TransitionRotatePage