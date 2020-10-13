import { useState, useEffect } from "react"
import BgWater from "../../lib/controller/BgWater"
import ImageLoader from "../../lib/loaders/ImageLoader"
import Gui from "../../components/guis/Gui"
import Range from '../../components/guis/Range'
import Checkbox from '../../components/guis/Checkbox';
import Button from '../../components/guis/Button';

let anim: BgWater

export default function BgWaterPage() {
  // didmount
  useEffect(() => {
    console.log('didmount', anim)
    const el = document.querySelector('[data-scene="BgWater"]') as HTMLCanvasElement
    const imageLoader = new ImageLoader()
    imageLoader.addList([
      '/images/_debug/x.png',
      '/images/_debug/y.png',
      '/images/_debug/z.png',
    ])
    imageLoader.start().then((loadedList) => {
      anim = new BgWater(el, loadedList)
      init()
    })
  }, [])

  const init = () => {
    guide(false)
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
  const seaLevel = (val: number) => {
    anim && anim.progress(Number(val))
  }

  return (
    <>
      <Gui>
        <Button name='start' onClick={play} />
        <Button name='stop' onClick={pause} />
        <Checkbox id='guide' name='ガイド' defaultValue={false} callback={guide} />
        <Range id='seaLevel' name='海抜' min="0.0" max="1.0" step="0.1" defaultValue='0.1' callback={seaLevel} />
      </Gui>
      <canvas data-scene="BgWater"></canvas>
    </>
  )
}
