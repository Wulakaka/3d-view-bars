import EventEmitter from './EventEmitter'
import * as THREE from 'three'
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import type { Font } from 'three/examples/jsm/loaders/FontLoader'

interface SourceBasic {
  name: string
  path: string
}
interface SourceTexture extends SourceBasic {
  type: 'texture'
}
interface SourceFont extends SourceBasic {
  type: 'font'
}
interface SourceGltfModel extends SourceBasic {
  type: 'gltfModel'
}
interface SourceCubeTexture {
  type: 'cubeTexture'
  path: string[]
  name: string
}

type Source = SourceTexture | SourceCubeTexture | SourceFont | SourceGltfModel

type Item = THREE.Texture | GLTF | THREE.CubeTexture | Font

export default class Resources extends EventEmitter {
  sources: Source[]
  items: {
    [name: string]: Item
  }
  loaders!: {
    gltfLoader?: GLTFLoader
    textureLoader?: THREE.TextureLoader
    cubeTextureLoader?: THREE.CubeTextureLoader
    fontLoader?: FontLoader
  }
  loaded: number
  toLoad: number
  ready: Promise<void>
  readyResolve!: () => void
  constructor(sources: Source[]) {
    super()

    // Options
    this.sources = sources

    // Setup
    // 保存已经加载的资源
    this.items = {}
    // 保存资源数量
    this.toLoad = this.sources.length
    // 保存已经加载的资源数量
    this.loaded = 0

    this.setLoaders()

    this.startLoading()

    this.ready = new Promise((resolve) => {
      this.readyResolve = resolve
    })
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.textureLoader = new THREE.TextureLoader()
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    this.loaders.fontLoader = new FontLoader()
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader!.load(source.path, (file) => {
          this.sourceLoaded(source, file)
        })
      } else if (source.type === 'texture') {
        this.loaders.textureLoader!.load(
          source.path,
          (file) => {
            this.sourceLoaded(source, file)
          },
          undefined,
          (error) => {
            console.error(error)
          }
        )
      } else if (source.type === 'cubeTexture') {
        this.loaders.cubeTextureLoader!.load(source.path, (file) => {
          this.sourceLoaded(source, file)
        })
      } else if (source.type === 'font') {
        this.loaders.fontLoader!.load(source.path, (file) => {
          this.sourceLoaded(source, file)
        })
      }
    }
  }

  sourceLoaded(source: Source, file: Item) {
    this.items[source.name] = file
    this.loaded++
    if (this.loaded === this.toLoad) {
      this.trigger('ready', undefined)
      this.readyResolve()
    }
  }
}
