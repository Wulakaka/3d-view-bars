import Experience from '../Experience'
import * as THREE from 'three'

import type GUI from 'lil-gui'
export default class Bump {
  experience: Experience
  scene: Experience['scene']
  debug: Experience['debug']
  debugFolder?: GUI
  material: THREE.MeshStandardMaterial
  params = {
    color: new THREE.Color('white')
  }
  constructor(experience: Experience, offset: number) {
    this.experience = experience
    this.scene = this.experience.scene
    this.debug = this.experience.debug

    if (this.debug.active) {
      this.debugFolder = this.debug.ui?.addFolder('Bump')
    }

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    geometry.scale(2, 6, 2)

    // 创建自定义 shader 材质
    this.material = new THREE.MeshStandardMaterial({
      color: this.params.color
    })
    this.material.needsUpdate = true

    const mesh = new THREE.Mesh(geometry, this.material)
    mesh.position.set(offset, 3, -offset)
    this.scene.add(mesh)
    this.addDebug()
  }

  addDebug() {
    if (this.debugFolder) {
      this.debugFolder.addColor(this.params, 'color').onChange(() => {
        this.material.color.set(this.params.color)
      })
    }
  }

  update() {
    // this.material.uniforms.uTime.value = this.experience.time.elapsed
  }
}
