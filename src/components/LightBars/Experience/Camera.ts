import Experience from './Experience'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
export default class Camera {
  experience: Experience
  sizes: Experience['sizes']
  scene: Experience['scene']
  canvas: Experience['canvas']
  instance!: THREE.PerspectiveCamera
  controls!: OrbitControls
  cameraTarget = new THREE.Vector3(0, 0, 0)
  constructor() {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas

    this.setInstance()
    this.setControls()
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
    this.instance.position.set(20, 20, 20)
    this.scene.add(this.instance)
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
    // 需要在 controls 更新后调用
    this.instance.lookAt(this.cameraTarget)
  }

  updateCameraTargetY(y: number) {
    this.cameraTarget.y = y
  }
}
