import * as THREE from 'three'
import Bar from '@/components/LightBars/Experience/World/Bar'

export default class BarTranslucent extends Bar {
  constructor(geometry: THREE.BoxGeometry, position: [number, number], color: string) {
    super(geometry, position, color)
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

  setMesh() {
    const [x, z] = this.position
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.position.set(x, 0, z)
    this.scene.add(this.mesh)
  }

  updateScale(scale: number) {
    this.mesh.scale.y = scale
  }
}
