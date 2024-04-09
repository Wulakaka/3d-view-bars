import * as THREE from 'three'
import Text from './Text'
import Experience from '@/components/LightBars/Experience/Experience'
export default class TextBottom {
  experience: Experience
  scene: Experience['scene']
  text: Text[]
  group: THREE.Group
  constructor(text: string) {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.group = new THREE.Group()
    this.scene.add(this.group)

    const size = 1.5
    const lineHeight = size * 1.6

    const t = text.split('')
    this.text = t.map((t) => new Text(t, size, this.group))
    this.text.forEach((t, index) => {
      t.mesh.rotation.x = -Math.PI / 2
      t.mesh.rotation.z = Math.PI / 2
      t.mesh.position.x = index * lineHeight + lineHeight / 2
    })
    this.group.position.x -= (this.text.length * lineHeight) / 2
  }
}
