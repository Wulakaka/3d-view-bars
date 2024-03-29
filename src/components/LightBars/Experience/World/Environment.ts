import Experience from '../Experience'
import * as THREE from 'three'
import type GUI from 'lil-gui'

export default class Environment {
  experience: Experience
  scene: Experience['scene']
  debug: Experience['debug']
  debugFolder!: GUI
  sunlight!: THREE.DirectionalLight
  ambientLight!: THREE.AmbientLight
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.debug = this.experience.debug

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui!.addFolder('environment')
    }

    // Setup
    this.setSunlight()
    this.setAmbientLight()
  }

  setSunlight() {
    this.sunlight = new THREE.DirectionalLight('#ffffff', 4)
    this.sunlight.castShadow = true
    this.sunlight.shadow.camera.far = 15
    this.sunlight.shadow.mapSize.set(1024, 1024)
    this.sunlight.shadow.normalBias = 0.05
    this.sunlight.position.set(3.5, 2, 0.5)
    this.scene.add(this.sunlight)

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.sunlight, 'intensity')
        .name('lightIntensity')
        .min(0)
        .max(4)
        .step(0.001)
      this.debugFolder.add(this.sunlight.position, 'x').min(-5).max(5).step(0.001).name('lightX')
      this.debugFolder.add(this.sunlight.position, 'y').min(-5).max(5).step(0.001).name('lightY')
      this.debugFolder.add(this.sunlight.position, 'z').min(-5).max(5).step(0.001).name('lightZ')
    }
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(0x404040) // 柔和的白光
    this.ambientLight.intensity = 10
    this.scene.add(this.ambientLight)

    // Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.ambientLight, 'intensity')
        .name('ambientLightIntensity')
        .min(0)
        .max(20)
        .step(0.001)
    }
  }
}
