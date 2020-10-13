import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls'
import { useRef } from 'react'
import { useFrame, extend, useThree, ReactThreeFiber } from 'react-three-fiber'

// <orbitControls />エレメントを作成
extend({ OrbitControls })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      readonly orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
    }
  }
}

export default function Controls(props: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>) {
  const {
    camera,
    gl: { domElement }
  } = useThree()
  const controls = useRef({} as OrbitControls)
  useFrame(() => controls.current.update())
  return <orbitControls {...props} ref={controls} args={[camera, domElement]} />
}
