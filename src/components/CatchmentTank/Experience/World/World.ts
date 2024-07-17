import Experience from '../Experience'
import Environment from './Environment'
import Tank from './Tank'
import Water from './Water'
import Bump from './Bump'

export default class World {
  experience: Experience
  resources: Experience['resources']
  scene: Experience['scene']
  environment?: Environment
  tank?: Tank
  water?: Water
  bump1?: Bump
  bump2?: Bump

  constructor(experience: Experience) {
    this.experience = experience
    this.resources = this.experience.resources
    this.scene = this.experience.scene
    this.experience.subjectReady.subscribe(() => {
      // setup
      this.tank = new Tank(this.experience)
      this.water = new Water(this.experience)
      this.bump1 = new Bump(this.experience, 2)
      this.bump2 = new Bump(this.experience, -2)
      this.environment = new Environment(this.experience)
    })
  }

  update() {
    // update
    this.water?.update()
  }
}
