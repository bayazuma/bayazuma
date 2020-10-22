import { useEffect } from "react"
import Freezer from "../../lib/controller/Freezer"
import ImageLoader from "../../lib/loaders/ImageLoader"
import Gui from "../../components/guis/Gui"
import Range from '../../components/guis/Range'
import Checkbox from '../../components/guis/Checkbox';
import Button from '../../components/guis/Button';

let anim: Freezer

export default function freezerPage() {
  // didmount
  useEffect(() => {
    const el = document.querySelector('[data-scene="Freezer"]') as HTMLCanvasElement
    const imageLoader = new ImageLoader()
    imageLoader.addList([
      '/images/_debug/x.png',
      '/images/_debug/y.png',
      '/images/_debug/z.png',
      '/images/_debug/kuma.jpg',
      '/images/_debug/kumask.jpg',
    ])
    imageLoader.start().then((loadedList) => {
      anim = new Freezer(el, loadedList)
      init()
    })
  }, [])

  const init = () => {
    // anim.world.cm!.setGUI(dat.gui.addFolder('Camra'))
    // anim.world.lightList[0]!.setGUI(dat.gui.addFolder('Light'))
    // anim.world.componentList.guide!.setGUI(dat.gui.addFolder('Guide'))
    // anim.world.componentList.frozen!.setGUI(
    //   dat.gui.addFolder('FrozenThree')
    // )

    guide(false)
  }

  const play = () => {
    anim.start()
  }
  const pause = () => {
    anim.stop()
  }
  const guide = (val: boolean) => {
    if (anim) {
      anim.world.componentList.guide.container.visible = val
    }
  }
  const frost = (val: number) => {
    anim && anim.progress(Number(val))
  }

  // three object
  const visible = (val: boolean) => {
    if (anim) {
      anim.frozen.object.visible = val
    }
  }
  const wireframe = (val: boolean) => {
    if (anim) {
      ((anim.frozen.material as THREE.ShaderMaterial) as THREE.ShaderMaterial).wireframe = val
    }
  }
  const uneven = (val: number) => {
    if (anim) {
      (anim.frozen.material as THREE.ShaderMaterial).uniforms.u_uneven_scale.value = val
    }
  }
  const noise = (val: number) => {
    if (anim) {
      (anim.frozen.material as THREE.ShaderMaterial).uniforms.u_noise_scale.value = val
    }
  }
  const blend_opacity = (val: number) => {
    if (anim) {
      (anim.frozen.material as THREE.ShaderMaterial).uniforms.u_blend_opacity.value = val
    }
  }
  const mix_opacity = (val: number) => {
    if (anim) {
      (anim.frozen.material as THREE.ShaderMaterial).uniforms.u_mix_opacity.value = val
    }
  }

  return (
    <>
      <Gui>
        <Button name='start' onClick={play} />
        <Button name='stop' onClick={pause} />
        <Checkbox id='guide' name='ガイド' defaultValue={false} callback={guide} />
        <Range id='frost' name='霜' min="0.0" max="1.0" step="0.1" defaultValue='0.1' callback={frost} />

        <Checkbox id='visible' name='オブジェクト' defaultValue={true} callback={visible} />
        <Checkbox id='wireframe' name='ワイヤー' defaultValue={false} callback={wireframe} />
        <Range id='uneven' name='ボコボコ' min="1" max="50" step="1" defaultValue='50' callback={uneven} />
        <Range id='noise' name='ノイズ' min="1" max="100" step="1" defaultValue='1' callback={noise} />

        <Range id='blend_opacity' name='ブレンド' min="-1" max="1" step="0.1" defaultValue='1' callback={blend_opacity} />
        <Range id='mix_opacity' name='透明' min="0" max="1" step="0.01" defaultValue='1' callback={mix_opacity} />
      </Gui>
      <canvas data-scene="Freezer"></canvas>
    </>
  )
}
