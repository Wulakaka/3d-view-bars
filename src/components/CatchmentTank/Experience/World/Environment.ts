import * as THREE from 'three'
import Experience from '../Experience'
import type GUI from 'lil-gui'

export default class Environment {
  experience: Experience
  scene: Experience['scene']
  debug: Experience['debug']
  debugFolder?: GUI

  sunlight: THREE.DirectionalLight
  ambientLight: THREE.AmbientLight

  constructor(experience: Experience) {
    this.experience = experience
    this.scene = this.experience.scene
    this.debug = this.experience.debug

    // sunlight
    this.sunlight = new THREE.DirectionalLight(0xffffff, 5)
    this.sunlight.position.set(1, 2, 1.5)
    this.scene.add(this.sunlight)
    if (this.debug.active) {
      this.debugFolder = this.debug.ui?.addFolder('Environment')
    }

    // Debug
    if (this.debugFolder) {
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

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    this.scene.add(this.ambientLight)
    if (this.debugFolder) {
      this.debugFolder
        .add(this.ambientLight, 'intensity')
        .name('ambientIntensity')
        .min(0)
        .max(4)
        .step(0.001)
    }
  }
}
