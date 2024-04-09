import * as THREE from 'three'
import Corner from '@/components/LightBars/Experience/World/Corner'
import Experience from '@/components/LightBars/Experience/Experience'

export default class Corners {
  experience: Experience
  scene: Experience['scene']
  geometry!: THREE.BoxGeometry
  corners: Corner[]
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.setGeometry()

    this.corners = [
      new Corner([-5.5, 5.5], 'rgb(52, 163, 224)', 'A区', this.geometry),
      new Corner([-5.5, -5.5], 'rgb(198, 229, 230)', 'B区', this.geometry),
      new Corner([5.5, 5.5], 'rgb(78, 246, 246)', 'C区', this.geometry),
      new Corner([5.5, -5.5], 'rgb(217, 224, 33)', 'D区', this.geometry)
    ]
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
    this.geometry.translate(0, 0.5, 0)
  }

  update() {
    this.corners.forEach((corner) => {
      corner.update()
    })
  }

  updateBars(scales: number[]) {
    this.corners.forEach((corner, i) => {
      corner.updateHeight(scales[i], scales[i + 4])
    })
  }
}
