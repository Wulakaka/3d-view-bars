import * as THREE from 'three'
import Corner from '@/components/LightBars/Experience/World/Corner'

export default class Corners {
  geometrySolid!: THREE.BoxGeometry
  geometryTranslucent!: THREE.BoxGeometry
  corners: Corner[]
  constructor() {
    this.setGeometry()

    this.corners = [
      new Corner(
        [-5.5, 5.5],
        'rgb(52, 163, 224)',
        'A',
        this.geometrySolid,
        this.geometryTranslucent
      ),
      new Corner(
        [-5.5, -5.5],
        'rgb(198, 229, 230)',
        'B',
        this.geometrySolid,
        this.geometryTranslucent
      ),
      new Corner(
        [5.5, 5.5],
        'rgb(78, 246, 246)',
        'C',
        this.geometrySolid,
        this.geometryTranslucent
      ),
      new Corner(
        [5.5, -5.5],
        'rgb(217, 224, 33)',
        'D',
        this.geometrySolid,
        this.geometryTranslucent
      )
    ]
  }

  setGeometry() {
    this.geometrySolid = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
    this.geometrySolid.translate(0, 0.5, 0)
    this.geometryTranslucent = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
    this.geometryTranslucent.translate(0, 0.5, 0)
    this.geometryTranslucent.scale(1.01, 1, 1.01)
  }

  updateBars(scales: number[]) {
    this.corners.forEach((corner, i) => {
      corner.updateHeight(scales[i], scales[i + 4])
    })
  }
}
