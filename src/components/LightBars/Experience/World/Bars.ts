import * as THREE from 'three'
import Bar from '@/components/LightBars/Experience/World/Bar'
import BarTranslucent from '@/components/LightBars/Experience/World/BarTranslucent'

export default class Bars {
  geometry!: THREE.BoxGeometry
  geometryTranslucent!: THREE.BoxGeometry
  bars: Bar[]
  constructor() {
    this.setGeometry()

    this.bars = [
      new Bar(this.geometry, [-5.5, 5.5], 'rgb(52, 163, 224)'),
      new Bar(this.geometry, [-5.5, -5.5], 'rgb(198, 229, 230)'),
      new Bar(this.geometry, [5.5, 5.5], 'rgb(78, 246, 246)'),
      new Bar(this.geometry, [5.5, -5.5], 'rgb(217, 224, 33)'),
      new BarTranslucent(this.geometryTranslucent, [-5.5, 5.5], 'rgb(52, 163, 224)'),
      new BarTranslucent(this.geometryTranslucent, [-5.5, -5.5], 'rgb(198, 229, 230)'),
      new BarTranslucent(this.geometryTranslucent, [5.5, 5.5], 'rgb(78, 246, 246)'),
      new BarTranslucent(this.geometryTranslucent, [5.5, -5.5], 'rgb(217, 224, 33)')
    ]
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
    this.geometry.translate(0, 0.5, 0)
    this.geometryTranslucent = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
    this.geometryTranslucent.translate(0, 0.5, 0)
    this.geometryTranslucent.scale(1.01, 1, 1.01)
  }

  updateBars(scales: number[]) {
    this.bars.forEach((bar, i) => {
      bar.updateScale(scales[i])
    })
  }
}
