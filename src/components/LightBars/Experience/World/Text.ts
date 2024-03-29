import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import Experience from '@/components/LightBars/Experience/Experience'
import * as THREE from 'three'

export default class Text {
  experience: Experience
  resources: Experience['resources']
  geometry!: TextGeometry
  material!: THREE.MeshBasicMaterial
  mesh!: THREE.Mesh
  text: string
  size: number
  group: THREE.Group

  constructor(text: string, size = 1, group: THREE.Group) {
    this.text = text
    this.size = size
    this.group = group
    this.experience = new Experience()
    this.resources = this.experience.resources

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new TextGeometry(this.text, {
      font: this.resources.items['helvetiker_bold']!,
      size: this.size,
      height: 0.1
    })
    this.geometry.computeBoundingBox()
    this.geometry.translate(
      -this.geometry.boundingBox!.max.x * 0.5,
      -this.geometry.boundingBox!.max.y * 0.5,
      -this.geometry.boundingBox!.max.z * 0.5
    )
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      color: new THREE.Color('white')
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.group.add(this.mesh)
  }
}
