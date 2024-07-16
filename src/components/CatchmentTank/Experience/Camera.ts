import * as THREE from 'three'
import Experience from './Experience'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
  experience: Experience
  canvas: Experience['canvas']
  sizes: Experience['sizes']
  scene: Experience['scene']
  instance: THREE.PerspectiveCamera
  controls: OrbitControls
  constructor(experience: Experience) {
    this.experience = experience
    this.canvas = experience.canvas
    this.sizes = experience.sizes
    this.scene = experience.scene
    this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
    this.instance.position.set(20, 20, 20)
    this.scene.add(this.instance)
    // controls
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
  }

  destroy() {
    this.controls.dispose()
  }
}
