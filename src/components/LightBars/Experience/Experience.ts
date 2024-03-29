import Time from './Utils/Time'
import * as THREE from 'three'
import Sizes from './Utils/Sizes'
import Camera from './Camera'
import Debug from './Utils/Debug'
import Renderer from './Renderer'
import World from './World/World'

let instance: Experience | null = null

export default class Experience {
  canvas: HTMLCanvasElement
  time: Time
  sizes: Sizes
  scene: THREE.Scene

  constructor(canvas: HTMLCanvasElement) {
    if (instance) return instance

    instance = this

    this.canvas = canvas

    // Setup
    this.debug = new Debug()
    this.sizes = new Sizes(380, 320)
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()

    // Time tick event
    this.time.on('tick', () => {
      this.update()
    })
  }

  update() {
    this.camera.update()
    // 要在 renderer 之前更新 world
    this.world.update()
    this.renderer.update()
  }
  destroy() {
    this.time.off('tick')
    this.sizes.off('resize')
    this.time.destroy()
    this.sizes.destroy()

    // dispose geometries, materials, textures, etc.
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        for (const key in child.material) {
          const value = child.material[key]
          if (value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })
    // dispose renderer
    this.renderer.instance.dispose()

    // destroy debug
    if (this.debug.active) {
      this.debug.ui.destroy()
    }
  }
}
