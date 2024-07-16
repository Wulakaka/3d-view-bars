import Experience from '../Experience'
import Environment from './Environment'
import Tank from './Tank'

export default class World {
  experience: Experience
  resources: Experience['resources']
  scene: Experience['scene']
  environment?: Environment
  tank?: Tank

  constructor(experience: Experience) {
    this.experience = experience
    this.resources = this.experience.resources
    this.scene = this.experience.scene
    this.experience.subjectReady.subscribe(() => {
      // setup
      this.tank = new Tank(this.experience)
      this.environment = new Environment(this.experience)
    })
  }

  update() {
    // update
  }
}
