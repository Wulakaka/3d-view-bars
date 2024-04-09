import * as THREE from 'three'
import Bar from '@/components/LightBars/Experience/World/Bar'
import Experience from '@/components/LightBars/Experience/Experience'
import Text from '@/components/LightBars/Experience/World/Text'

export default class Corner {
  group: THREE.Group
  name: string
  color: string
  experience: Experience
  scene: Experience['scene']
  geometry: THREE.BoxGeometry
  barOverlapped!: Bar
  barSolid!: Bar
  barTranslucent!: Bar
  text!: Text
  constructor(
    position: [number, number],
    color: string,
    name: string,
    geometry: THREE.BoxGeometry
  ) {
    this.group = new THREE.Group()
    this.color = color
    const [x, z] = position
    this.group.position.set(x, 0, z)
    this.name = name
    this.geometry = geometry
    this.experience = new Experience()
    this.scene = this.experience.scene

    this.setBarOverlapped()
    this.setBarSolid()
    this.setBarTranslucent()
    this.setText()
    this.addToScene()
  }

  setBarOverlapped() {
    const color = new THREE.Color(this.color)
    color.multiplyScalar(0.5)
    this.barOverlapped = new Bar(this.geometry, color, this.group, 1.0)
  }
  setBarSolid() {
    this.barSolid = new Bar(this.geometry, this.color, this.group, 1.0)
  }

  setBarTranslucent() {
    this.barTranslucent = new Bar(this.geometry, this.color, this.group, 0.5)
  }

  setText() {
    this.text = new Text(this.name, 0.6, this.group)
    this.text.mesh.position.y = 2
    this.text.mesh.rotation.y = Math.PI / 4
  }

  addToScene() {
    this.scene.add(this.group)
  }

  updateHeight(a: number, b: number) {
    const min = Math.min(a, b)
    this.barOverlapped.updateScale(min)

    const solidHeight = Math.max(a - b, 0)
    const translucentHeight = Math.max(b - a, 0)
    this.barSolid.updateScale(solidHeight)
    this.barSolid.updatePositionY(min - 0.01)
    this.barTranslucent.updateScale(translucentHeight)
    this.barTranslucent.updatePositionY(min + solidHeight - 0.02)

    const max = Math.max(a, b)
    this.text.updatePositionY(max + 0.8)
  }
}
