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
  geometrySolid: THREE.BoxGeometry
  geometryTranslucent: THREE.BoxGeometry
  barSolid!: Bar
  barTranslucent!: Bar
  text!: Text
  constructor(
    position: [number, number],
    color: string,
    name: string,
    geometrySolid: THREE.BoxGeometry,
    geometryTranslucent: THREE.BoxGeometry
  ) {
    this.group = new THREE.Group()
    this.color = color
    const [x, z] = position
    this.group.position.set(x, 0, z)
    this.name = name
    this.geometrySolid = geometrySolid
    this.geometryTranslucent = geometryTranslucent
    this.experience = new Experience()
    this.scene = this.experience.scene

    this.setBarSolid()
    this.setBarTranslucent()
    this.setText()
    this.addToScene()
  }

  setBarSolid() {
    this.barSolid = new Bar(this.geometrySolid, this.color, this.group, 1.0)
    this.barSolid.mesh.position.y = 0.001
    this.barSolid.mesh.scale.x = 0.5
    this.barSolid.mesh.scale.z = 0.5
  }

  setBarTranslucent() {
    this.barTranslucent = new Bar(this.geometryTranslucent, this.color, this.group, 0.5)
  }

  setText() {
    this.text = new Text(this.name, 0.8, this.group)
    this.text.mesh.position.y = 2
    this.text.mesh.rotation.y = Math.PI / 4
  }

  addToScene() {
    this.scene.add(this.group)
  }

  updateHeight(a: number, b: number) {
    const max = Math.max(a, b)
    this.barSolid.updateScale(a)
    this.barTranslucent.updateScale(b)
    this.text.mesh.position.y = max + 0.8
  }
}
