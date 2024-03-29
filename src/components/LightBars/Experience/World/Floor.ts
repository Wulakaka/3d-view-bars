import Experience from '../Experience.ts'
import * as THREE from 'three'
import floorVertexShader from '@/shaders/floor/vertex.glsl'
import floorFragmentShader from '@/shaders/floor/fragment.glsl'

export default class Floor {
  material: THREE.ShaderMaterial
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    // this.resources = this.experience.resources

    // Setup
    this.setGeometry()
    // this.setTextures()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1)
  }

  setTextures() {
    this.textures = {}

    this.textures.color = this.resources.items.grassColorTexture
    this.textures.color.colorSpace = THREE.SRGBColorSpace
    this.textures.color.repeat.set(1.5, 1.5)
    this.textures.color.wrapS = THREE.RepeatWrapping
    this.textures.color.wrapT = THREE.RepeatWrapping

    this.textures.normal = this.resources.items.grassNormalTexture
    this.textures.normal.repeat.set(1.5, 1.5)
    this.textures.normal.wrapS = THREE.RepeatWrapping
    this.textures.normal.wrapT = THREE.RepeatWrapping
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: floorVertexShader,
      fragmentShader: floorFragmentShader,
      uniforms: {
        uColorFrom: new THREE.Uniform(new THREE.Color('#07FE78')),
        uColorTo: new THREE.Uniform(new THREE.Color('#2536C6'))
      },
      transparent: true
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.scale.set(12, 12, 1)
    // 变成地面
    this.mesh.rotation.x = -Math.PI * 0.5
    // this.mesh.receiveShadow = true
    this.scene.add(this.mesh)
  }
}
