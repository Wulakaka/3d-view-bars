import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import Experience from '@/components/LightBars/Experience/Experience'
import * as THREE from 'three'

export default class TextBottom {
  experience: Experience
  resources: Experience['resources']
  scene: Experience['scene']
  geometry!: TextGeometry
  material!: THREE.MeshBasicMaterial
  mesh!: THREE.Mesh
  constructor() {
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.scene = this.experience.scene

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new TextGeometry('A', {
      font: this.resources.items['helvetiker_bold']!
    })
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      color: new THREE.Color('white')
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.scale.set(0.01, 0.01, 0.001)
    this.scene.add(this.mesh)
  }
}
