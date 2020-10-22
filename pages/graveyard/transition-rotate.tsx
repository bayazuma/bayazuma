import { useEffect } from "react"
import Gui from "../../components/guis/Gui"
import Range from '../../components/guis/Range'
import TransitionRotate from "../../lib/controller/TransitionRotate"

let anim: TransitionRotate

export default function TransitionRotatePage() {
  useEffect(() => {
    const el = document.querySelector('[data-scene="TransitionRotate"]') as HTMLElement
    anim = new TransitionRotate(el)
  }, [])

  const next = (val: number) => {
    // const degree = ((index * 1) / blocks.length) * 360
    const degree = (val / 30) * 360
    const radian = degree * (Math.PI / 180)
    anim && anim.next(radian)
  }

  return (
    <>
    <Gui>
      <Range id='move' name='移動' min="0" max="30" step="5" defaultValue='1' callback={next} />
    </Gui>
    <div className="TransitionRotate" data-scene="TransitionRotate">
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
    </>
  )
}
