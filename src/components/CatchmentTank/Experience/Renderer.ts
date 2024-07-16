import * as THREE from 'three'
import type Experience from './Experience'

export default class Renderer {
  experience: Experience
  canvas: Experience['canvas']
  sizes: Experience['sizes']
  scene: Experience['scene']
  camera: Experience['camera']
  instance: THREE.WebGLRenderer
  constructor(experience: Experience) {
    this.experience = experience
    this.canvas = this.experience.canvas
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.camera = this.experience.camera

    // instance
    this.instance = new THREE.WebGLRenderer({
      canvas: this.experience.canvas,
      alpha: true,
      antialias: true
    })
    this.instance.toneMapping = THREE.CineonToneMapping
    this.instance.toneMappingExposure = 1.75
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    // this.instance.setClearColor('red')
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    this.instance.render(this.scene, this.camera.instance)
  }

  destroy() {
    this.instance.dispose()
  }
}
