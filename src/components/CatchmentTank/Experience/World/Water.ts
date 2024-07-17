import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import Experience from '../Experience'
import * as THREE from 'three'
import waterVertexShader from '@/shaders/water/vertex.glsl?raw'
import waterFragmentShader from '@/shaders/water/fragment.glsl?raw'
import type GUI from 'lil-gui'
export default class Water {
  experience: Experience
  scene: Experience['scene']
  debug: Experience['debug']
  debugFolder?: GUI
  material: CustomShaderMaterial
  constructor(experience: Experience) {
    this.experience = experience
    this.scene = this.experience.scene
    this.debug = this.experience.debug

    if (this.debug.active) {
      this.debugFolder = this.debug.ui?.addFolder('Water')
    }

    const geometry = new THREE.PlaneGeometry(10, 10, 32, 32)
    geometry.rotateX(-Math.PI / 2)
    geometry.translate(0, 4, 0)

    // 创建自定义 shader 材质
    this.material = new CustomShaderMaterial({
      // CSM
      baseMaterial: THREE.MeshStandardMaterial,
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
      uniforms: {
        uTime: new THREE.Uniform(0)
      },

      // MeshStandardMaterial
      color: '#08daf6',
      roughness: 0,
      metalness: 0,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide
    })

    const depthMaterial = new CustomShaderMaterial({
      baseMaterial: THREE.MeshDepthMaterial,
      vertexShader: waterVertexShader,
      uniforms: {
        uTime: new THREE.Uniform(0)
      },

      // MeshDepthMaterial
      depthPacking: THREE.RGBADepthPacking
    })

    const mesh = new THREE.Mesh(geometry, this.material)
    mesh.customDepthMaterial = depthMaterial
    this.scene.add(mesh)
    this.addDebug()
  }

  addDebug() {
    if (this.debugFolder) {
      this.debugFolder.addColor(this.material, 'color').onChange(() => {
        this.material.needsUpdate = true
      })
    }
  }

  update() {
    this.material.uniforms.uTime.value = this.experience.time.elapsed
  }
}
