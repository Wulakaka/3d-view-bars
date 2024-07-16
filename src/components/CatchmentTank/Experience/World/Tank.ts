import Experience from '../Experience'
import * as THREE from 'three'
export default class Tank {
  experience: Experience
  scene: Experience['scene']
  geometry: THREE.BoxGeometry
  material: THREE.MeshBasicMaterial
  mesh: THREE.Mesh

  constructor(experience: Experience) {
    this.experience = experience
    this.scene = this.experience.scene

    this.geometry = new THREE.BoxGeometry(4, 4, 4)
    this.material = new THREE.MeshBasicMaterial({ color: 'red' })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }
}
