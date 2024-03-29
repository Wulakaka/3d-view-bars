import * as THREE from 'three'
import Bar from '@/components/LightBars/Experience/World/Bar'

export default class BarTranslucent extends Bar {
  constructor(geometry: THREE.BoxGeometry, color: string, group: THREE.Group) {
    super(geometry, color, group)
  }

  setTextures() {
    this.textures = {}
    this.textures.alpha = this.resources.items['alpha60']

    // this.textures.normal.wrapS = THREE.RepeatWrapping
    // this.textures.normal.wrapT = THREE.RepeatWrapping
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: this.color,
      alphaMap: this.textures.alpha,
      transparent: true
    })
  }
}
