import { useRef, useState } from 'react'
import { Canvas, useFrame, extend, useThree, ReactThreeFiber } from 'react-three-fiber'
import { BufferGeometry, Geometry, Material, Mesh } from 'three'
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls'

// <orbitControls />エレメントを作成
extend({ OrbitControls })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      readonly orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
    }
  }
}

function Controls(props: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>) {
  const {
    camera,
    gl: { domElement }
  } = useThree()
  const controls = useRef({} as OrbitControls)
  useFrame(() => controls.current.update())
  return <orbitControls {...props} ref={controls} args={[camera, domElement]} />
}

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<ReactThreeFiber.Object3DNode<Mesh<Geometry | BufferGeometry, Material | Material[]>, typeof Mesh>>()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if(mesh) {
      mesh.current.rotation[0] += 0.01 // x
      mesh.current.rotation[1] += 0.01 // y
    }
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
      <arrowHelper />
    </mesh>
  )
}

export default function Graveyard() {
  return (
    <div className="container">
      <Canvas>
        <Controls />
        <axesHelper />
        <gridHelper />

        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
      <style jsx>{`
        .container {
          width: 100%;
          height: 100vh;
          background: black;
        }
      `}</style>
    </div>
  )
}