import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import vertexShader from '../../lib/shaders/drip.vert'
import fragmentShader from '../../lib/shaders/drip.frag'
import OrbitControls from '../../components/fiber/OrbitControls'
import { ControlsProvider, Controls, useControl } from 'react-three-gui'

// ウィンドウサイズの平面がぴったり収まるカメラ距離を計算
function calcDistance(fov: number, h: number): number {
  // 視野角をラジアンに変換
  const fovRad = (fov / 2) * (Math.PI / 180)

  // 三角関数のtanの定義
  // Math.tan(fovRad)        = (height / 2) / distance; // 途中式
  // Math.tan(fovRad) * dist = (height / 2);        // 途中式
  return h / 2 / Math.tan(fovRad)
}
 

function Box(props) {
  // const { width, height } = useWindowDimensions()

  const width = 500
  const height = 500

  const rotateXY = useControl('rotateXY', { type: 'xypad', distance: Math.PI })
  const visibe = useControl('visibe', { type: 'boolean', value: true })
  const wireframe = useControl('wireframe', { type: 'boolean' })
  const progress = useControl('progress', { type: 'number', min: 0.0, max: 1.0, value: 1.0 })
  

  
  // This reference will give us direct access to the mesh
  const mesh = useRef({} as THREE.Mesh)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(({ clock }) => {
    const mat = mesh.current.material as THREE.ShaderMaterial

    mat.uniforms.u_time.value += clock.getDelta() * 100
    // uni.u_progress.value = progress
  })

  const uniforms = {
    u_time: { value: 0.0 },
    u_progress: { value: progress },
    u_resolution: {
      value: new THREE.Vector2(width, height),
    },
  }

  return (
    <mesh
      {...props}
      ref={mesh}
      rotation-x={rotateXY.x}
      rotation-y={rotateXY.y}
      visible={visibe}
      wireframe={wireframe}
    >
      <planeBufferGeometry attach="geometry" args={[width, width]} />
      <shaderMaterial
        attach="material"
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        needsUpdate={true}
      />

      <arrowHelper />
    </mesh>
  )
}

export default function Graveyard() {
  // const { width, height } = useWindowDimensions()
  const width = 500
  const height = 500

  const fov = 75
  const dist = calcDistance(fov, height)
  return (
    <div className="container">
      {/* <ControlsProvider> */}
        <Canvas
          camera={
          {
            fov,
            near: 0.1,
            far: dist * 5,
            aspect: width / height,
            position: [0, 0, dist]
          }
        }
        >
          <OrbitControls />
          <axesHelper
            args={[width]}
          />
          <gridHelper
            args={[width, 10]}
          />

          <directionalLight
            color={0xFFFFFF}
            position={[0, 10, 10]}
          />
          {/* <pointLight position={[10, 10, 10]} /> */}

          <Box position={[0, 0, 0]} />
        </Canvas>
        {/* <Controls /> */}
      {/* </ControlsProvider> */}
      <style jsx>{`
        .container {
          width: 100%;
          height: 100vh;
          background: white;
        }
      `}</style>
    </div>
  )
}