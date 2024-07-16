import * as THREE from 'three'
import { FontLoader, type Font } from 'three/examples/jsm/loaders/FontLoader.js'
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Experience from '../Experience'

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

export default class Resources {
  experience: Experience
  sources: Source[]
  items: {
    [name: string]: Item
  } = {}
  loaders = {
    textureLoader: new THREE.TextureLoader(),
    gltfLoader: new GLTFLoader(),
    fontLoader: new FontLoader(),
    cubeTextureLoader: new THREE.CubeTextureLoader()
  }
  loaded = 0
  toLoad: number

  constructor(experience: Experience, sources: Source[]) {
    this.experience = experience
    this.sources = sources
    this.toLoad = this.sources.length
    this.startLoading()
    if (!this.sources.length) {
      setTimeout(() => {
        this.experience.subjectReady.next()
      })
    }
  }

  startLoading() {
    this.sources.forEach((source) => {
      switch (source.type) {
        case 'texture':
          this.loaders.textureLoader.load(source.path, (texture) => {
            this.sourceLoaded(source, texture)
          })
          break
        case 'font':
          this.loaders.fontLoader.load(source.path, (font) => {
            this.sourceLoaded(source, font)
          })
          break
        case 'gltfModel':
          this.loaders.gltfLoader.load(source.path, (gltf) => {
            this.sourceLoaded(source, gltf)
          })
          break
        case 'cubeTexture':
          this.loaders.cubeTextureLoader.load(source.path, (cubeTexture) => {
            this.sourceLoaded(source, cubeTexture)
          })
          break
      }
    })
  }

  sourceLoaded(source: Source, file: Item) {
    this.items[source.name] = file
    this.loaded++
    if (this.loaded === this.toLoad) {
      this.experience.subjectReady.next()
    }
  }
}
