import Experience from '../Experience'
import * as THREE from 'three'
import { gsap } from 'gsap'

export default class Bar {
  color: string | THREE.Color
  experience: Experience
  scene: Experience['scene']
  resources: Experience['resources']
  geometry!: THREE.BoxGeometry
  material!: THREE.MeshStandardMaterial
  mesh!: THREE.Mesh
  textures!: {
    [name: string]: THREE.Texture
  }
  group: THREE.Group
  opacity: number
  constructor(
    geometry: THREE.BoxGeometry,
    color: string | THREE.Color,
    group: THREE.Group,
    opacity: number
  ) {
    this.geometry = geometry
    this.color = color
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.group = group
    this.opacity = opacity

    // Setup
    this.setTextures()
    this.setMaterial()
    this.setMesh()
  }

  setTextures() {}

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: this.color,
      transparent: true,
      opacity: this.opacity
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.group.add(this.mesh)
  }

  updateScale(scale: number) {
    gsap.to(this.mesh.scale, {
      duration: 1,
      y: scale
    })
  }

  updatePositionY(y: number) {
    gsap.to(this.mesh.position, {
      duration: 1,
      y: y
    })
  }
}
