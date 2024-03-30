import Experience from '../Experience'
import * as THREE from 'three'

export default class Bar {
  color: string
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
  constructor(geometry: THREE.BoxGeometry, color: string, group: THREE.Group, opacity: number) {
    this.geometry = geometry
    this.color = color
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.group = group
    this.opacity = opacity

    // Setup
    // this.setGeometry()
    this.setTextures()
    this.setMaterial()
    this.setMesh()
  }

  setTextures() {}

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: this.color,
      depthWrite: false,
      // depthTest: false,
      transparent: true,
      opacity: this.opacity
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.group.add(this.mesh)
  }

  updateScale(scale: number) {
    this.mesh.scale.y = scale
  }
}
