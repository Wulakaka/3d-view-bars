import Experience from '../Experience'
import * as THREE from 'three'

export default class Bar {
  position: [number, number]
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
  constructor(geometry: THREE.BoxGeometry, position: [number, number], color: string) {
    this.geometry = geometry
    this.position = position
    this.color = color
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

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
      transparent: true,
    })
  }

  setMesh() {
    const [x, z] = this.position
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.set(x, 0, z)
    this.scene.add(this.mesh)
  }

  updateScale(scale: number) {
    this.mesh.scale.y = scale
  }
}
