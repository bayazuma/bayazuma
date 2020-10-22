import * as THREE from 'three'
import { useEffect } from "react"
import BgWater from "../../lib/controller/BgWater"
import ImageLoader from "../../lib/loaders/ImageLoader"
import Gui from "../../components/guis/Gui"
import Range from '../../components/guis/Range'
import Checkbox from '../../components/guis/Checkbox';
import Button from '../../components/guis/Button';
import Color from '../../components/guis/Color';

let anim: BgWater

export default function BgWaterPage() {
  // didmount
  useEffect(() => {
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
    // anim.world.cm!.setGUI(dat.gui.addFolder('Camra'))
    // anim.world.lightList[0]!.setGUI(dat.gui.addFolder('Light'))
    // anim.world.componentList.guide!.setGUI(dat.gui.addFolder('Guide'))
    // anim.world.componentList.drip!.setGUI(dat.gui.addFolder('DripThree'))

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
  // const seaLevel = (val: number) => {
  //   anim && anim.progress(Number(val))
  // }

  // three object
  const visible = (val: boolean) => {
    if (anim) {
      anim.water2D.object.visible = val
    }
  }
  const wireframe = (val: boolean) => {
    if (anim) {
      (anim.water2D.material as THREE.ShaderMaterial).wireframe = val
    }
  }
  const progress = (val: number) => {
    if (anim) {
      (anim.water2D.material as THREE.ShaderMaterial).uniforms.u_progress.value = val
    }
  }
  const moveX = (val: number) => {
    if (anim) {
      anim.water2D.object.position.x = window.innerWidth * val
    }
  }
  const color = (col: string) => {
    const col3 = new THREE.Color( col )
    if (anim) {
      (anim.water2D.material as THREE.ShaderMaterial).uniforms.u_color.value.x = col3.r as number
      (anim.water2D.material as THREE.ShaderMaterial).uniforms.u_color.value.y = col3.g as number
      (anim.water2D.material as THREE.ShaderMaterial).uniforms.u_color.value.z = col3.b as number
    }
  }

  return (
    <>
      <Gui>
        <Button name='start' onClick={play} />
        <Button name='stop' onClick={pause} />
        <Checkbox id='guide' name='ガイド' defaultValue={false} callback={guide} />
        {/* <Range id='seaLevel' name='海抜' min="0.0" max="1.0" step="0.1" defaultValue='0.1' callback={seaLevel} /> */}

        <Checkbox id='visible' name='オブジェクト' defaultValue={true} callback={visible} />
        <Checkbox id='wireframe' name='ワイヤー' defaultValue={false} callback={wireframe} />
        <Range id='progress' name='海抜' min="0" max="1" step="0.01" defaultValue='0.5' callback={progress} />
        <Range id='moveX' name='x' min="-1" max="1" step="0.1" defaultValue='0' callback={moveX} />
        <Color id='color' name='カラー' defaultValue='' callback={color} />
      </Gui>
      <canvas data-scene="BgWater"></canvas>
      <div className="box">
      </div>
      <style jsx>{`
        .box {
          width: 50%;
          height: 100vh;
          border: 2px dashed #bfbfbf;
          position: fixed;
          top: 0;
          right: 0;
          z-index: 1;
        }
      `}</style>
    </>
  )
}
