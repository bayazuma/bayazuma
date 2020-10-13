import * as THREE from 'three'
import { OrbitControls } from '../../../../node_modules/three/examples/jsm/controls/OrbitControls.js'
import { GUI } from '../../../../node_modules/three/examples/jsm/libs/dat.gui.module.js'
import Camera from '../../base/Camera'
import Position from '../../../utils/Position'

export default function Debug() {
  return function <T extends new (...args: any[]) => any>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      orbitControls: OrbitControls
      constructor(...args: any[]) {
        super(...args)

        // this.createBirdCamera()
        this.createHelper()
        this.createObject()
        this.createLookAtPoint()

        this.lookAtVector = new THREE.Vector3(0, 0, 0)

        // カメラが常にlookAtするかどうか
        this.isLookAt = false

        // デバッグ用定点カメラ
        this.list.birdX = new THREE.PerspectiveCamera(
          this.fov,
          this.aspect,
          this.near,
          this.far
        )
        this.list.birdY = new THREE.PerspectiveCamera(
          this.fov,
          this.aspect,
          this.near,
          this.far
        )
        this.list.birdZ = new THREE.PerspectiveCamera(
          this.fov,
          this.aspect,
          this.near,
          this.far
        )

        this.reset()
        this.orbitControls = new OrbitControls(this.activeCamera, this.canvas) // debug用
      }

      reset() {
        this.currentName = 'main'
        this.scale = 0.2
        this.list.birdX.position.set(this.distance, 0, 0)
        this.list.birdY.position.set(0, this.distance, 0)
        this.list.birdZ.position.set(0, 0, this.distance)
        this.list.birdX.lookAt(new THREE.Vector3(0, 0, 0))
        this.list.birdY.lookAt(new THREE.Vector3(0, 0, 0))
        this.list.birdZ.lookAt(new THREE.Vector3(0, 0, 0))
      }

      // メインカメラの表示範囲を可視化
      createHelper() {
        this.helper = new THREE.CameraHelper(this.list.main)
        this.helper.renderOrder = -1
        this.helper.visible = false
        this.container.add(this.helper)
      }

      // メインカメラの位置を可視化
      createObject() {
        this.cameraObject = new Camera()
        this.cameraObject.container.visible = false
        this.container.add(this.cameraObject.container)
      }

      // lookAtする座標を可視化
      createLookAtPoint() {
        this.lookAtPoint = new THREE.Mesh(
          new THREE.BoxBufferGeometry(1, 1, 1),
          new THREE.MeshPhongMaterial({
            color: 0x0099cc,
            emissive: 0x0099cc,
          })
        )
        this.lookAtPoint.visible = false
        this.container.add(this.lookAtPoint)
      }

      // setGUI(): void {
      //   const gui = new GUI()
      //   const folder = gui.addFolder('test')
      //   // const dat = DatGUISingleton.getInstance()
      //   // const folder = dat.gui.addFolder(
      //   //   DatGUISingleton.getFolderName('Camera')
      //   // )

      //   // メインカメラ
      //   folder.add(this.list.main.position, 'x', -200, 200, 1).listen()
      //   folder.add(this.list.main.position, 'y', -200, 200, 1).listen()
      //   folder.add(this.list.main.position, 'z', -200, 200, 1).listen()

      //   // lookAtの編集
      //   folder.add(this, 'isLookAt').name('lookAt')
      //   folder.add(this.lookAtPoint, 'visible').name('lookAtPoint')
      //   folder.add(this.lookAtVector, 'x', -10, 10, 5).name('lookAtX')
      //   folder.add(this.lookAtVector, 'y', -10, 10, 5).name('lookAtY')
      //   folder.add(this.lookAtVector, 'z', -10, 10, 5).name('lookAtZ')

      //   // object
      //   folder.add(this, 'scale', 0.1, 1, 0.1)
      //   folder.add(this.cameraObject.container, 'visible').name('object')

      //   // helper
      //   folder.add(this.helper, 'visible').name('area')

      //   // カメラ切り替え
      //   folder
      //     .add(this, 'currentName', ['main', 'birdX', 'birdY', 'birdZ'])
      //     .listen()
      //   folder.add(this, 'switching')

      //   const debug = {
      //     updateVal: 0.0,
      //   }
      //   folder.add(debug, 'updateVal', 0.0, 1.0, 0.005).onChange((val) => {
      //     this.updateMaster(val)
      //   })

      //   // リセット
      //   folder.add(this, 'reset')

      //   // this.datDomElement = dat.gui.domElement
      // }

      switching() {
        this.activeCamera = this.list[this.currentName]
        this.activeCamera.updateMatrixWorld()
      }

      update(mouse: Position) {
        super.update(mouse)

        this.cameraObject.container.position.copy(this.list.main.position)
        this.cameraObject.container.rotation.copy(this.list.main.rotation)
        this.cameraObject.container.scale.set(
          this.scale,
          this.scale,
          this.scale
        )

        if (this.lookAtPoint.visible) {
          this.lookAtPoint.rotation.x += 0.03
          this.lookAtPoint.rotation.y += 0.04
        }

        if (this.isLookAt) {
          this.lookAtPoint.position.copy(this.lookAtVector)
          this.list.main.lookAt(this.lookAtVector)
        }
      }

      // 画面のリサイズに連動して呼び出される
      resize(w: number, h: number) {
        super.resize(w, h)
      }
    }
  }
}
