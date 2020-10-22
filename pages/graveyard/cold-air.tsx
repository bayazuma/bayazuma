import { useEffect } from "react"
import ColdAir from "../../lib/controller/ColdAir"
import ImageLoader from "../../lib/loaders/ImageLoader"
import Gui from "../../components/guis/Gui"
import Range from '../../components/guis/Range'
import Checkbox from '../../components/guis/Checkbox';
import Button from '../../components/guis/Button';
import Color from '../../components/guis/Color';

let anim: ColdAir

export default function coldAirPage() {
  // didmount
  useEffect(() => {
    const el = document.querySelector('[data-scene="ColdAir"]') as HTMLCanvasElement
    const imageLoader = new ImageLoader()
    imageLoader.addList([
      '/images/_debug/x.png',
      '/images/_debug/y.png',
      '/images/_debug/z.png',
      '/images/_debug/particle.png',
    ])
    imageLoader.start().then((loadedList) => {
      anim = new ColdAir(el, loadedList)
      init()
    })
  }, [])

  const init = () => {
    guide(false)
  }

  const start = () => {
    anim.start()
  }
  const stop = () => {
    anim.stop()
  }
  const play = () => {
    anim.play()
  }
  const pause = () => {
    anim.pause()
  }
  const guide = (val: boolean) => {
    if (anim) {
      anim.world.componentList.guide.container.visible = val
    }
  }

  // three object
  const visible = (val: boolean) => {
    if (anim) {
      anim.particles.object.visible = val
    }
  }
  const count = (val: number) => {
    if (anim) {
      (anim.particles.geometry as THREE.BufferGeometry).drawRange.count = val
    }
  }
  const opacity = (val: number) => {
    if (anim) {
      anim.particles.material.opacity = val
    }
  }
  const color = (col: string) => {
    if (anim) {
      (anim.particles.material as THREE.PointsMaterial).color.set(col)
    }
  }
  const speed = (val: number) => {
    if (anim) {
      anim.particles.param.speed = val
    }
  }
  
  return (
    <>
      <Gui>
        <Button name='start' onClick={start} />
        <Button name='stop' onClick={stop} />
        <Button name='play' onClick={play} />
        <Button name='pause' onClick={pause} />
        <Checkbox id='guide' name='ガイド' defaultValue={false} callback={guide} />

        <Checkbox id='visible' name='オブジェクト' defaultValue={true} callback={visible} />
        <Range id='count' name='パーティクル数' min="0" max="900" step="100" defaultValue='100' callback={count} />
        <Range id='opacity' name='透明度' min="0" max="1" step="0.01" defaultValue='0.1' callback={opacity} />
        <Color id='color' name='カラー' defaultValue='' callback={color} />
        <Range id='speed' name='スピード' min="-0.1" max="0" step="0.001" defaultValue='0' callback={speed} />
      </Gui>
      <canvas data-scene="ColdAir"></canvas>
    </>
  )
}
