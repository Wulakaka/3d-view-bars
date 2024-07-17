import Experience from '../Experience'
import * as THREE from 'three'
import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg'
export default class Tank {
  experience: Experience
  scene: Experience['scene']

  constructor(experience: Experience) {
    this.experience = experience
    this.scene = this.experience.scene

    const fill = new Brush(new THREE.BoxGeometry(11, 6, 11))
    const hole = new Brush(new THREE.BoxGeometry(10, 5, 10))
    fill.position.set(0, -0.5, 0)
    fill.updateMatrixWorld()

    // Evaluate
    const evaluator = new Evaluator()
    const board = evaluator.evaluate(fill, hole, SUBTRACTION)
    // 清除原有的groups
    board.geometry.clearGroups()
    board.material = new THREE.MeshStandardMaterial({
      color: '#bababa',
      roughness: 0.3,
      metalness: 0
      // transparent: true,
      // opacity: 0.5
      // side: THREE.DoubleSide
    })
    board.castShadow = true
    board.receiveShadow = true
    board.position.set(0, 2.5, 0)
    console.log(board.material)
    this.scene.add(board)
  }
}
