import Experience from '../Experience'
import * as THREE from 'three'
import floorVertexShader from '@/shaders/floor/vertex.glsl?raw'
import floorFragmentShader from '@/shaders/floor/fragment.glsl?raw'

export default class Floor {
  geometry!: THREE.PlaneGeometry
  material!: THREE.ShaderMaterial
  experience: Experience
  scene: Experience['scene']
  mesh!: THREE.Mesh
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

    // Setup
    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1)
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: floorVertexShader,
      fragmentShader: floorFragmentShader,
      uniforms: {
        uColorFrom: new THREE.Uniform(new THREE.Color('#2536C6')),
        uColorTo: new THREE.Uniform(new THREE.Color('#07FE78'))
      },
      transparent: true,
      side: THREE.DoubleSide
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.scale.set(12, 12, 1)
    // 变成地面
    this.mesh.rotation.x = -Math.PI * 0.5
    this.mesh.rotation.z = Math.PI * 0.5
    this.mesh.position.y = -0.002
    this.scene.add(this.mesh)
  }
}
