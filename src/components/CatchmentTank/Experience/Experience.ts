import * as THREE from 'three'
import Debug from './Utils/Debug'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import sources from './sources'
import Resources from './Utils/Resources'
import Camera from './Camera'
import Renderer from './Renderer'
import { Subject } from 'rxjs'
import World from './World/World'

export default class Experience {
  subjectReady = new Subject<void>()
  subjectTick = new Subject<void>()
  subjectResize = new Subject<void>()

  canvas: HTMLCanvasElement
  debug = new Debug()
  sizes: Sizes
  time: Time
  scene = new THREE.Scene()
  resources: Resources
  camera: Camera
  renderer: Renderer
  world: World

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.sizes = new Sizes(this, this.canvas.width, this.canvas.height)
    this.time = new Time(this)
    this.resources = new Resources(this, sources)
    this.camera = new Camera(this)
    this.renderer = new Renderer(this)
    this.world = new World(this)
    this.subjectResize.subscribe(() => {
      this.resize()
    })
    this.subjectTick.subscribe(() => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  destroy() {
    this.debug.destroy()
    this.sizes.destroy()
    this.time.destroy()
    this.camera.destroy()

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

    this.renderer.destroy()
  }
}
