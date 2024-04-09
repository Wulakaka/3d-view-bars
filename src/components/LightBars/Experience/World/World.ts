import Experience from '../Experience'
import Floor from './Floor'
import Environment from './Environment'
import TextBottom from '@/components/LightBars/Experience/World/TextBottom'
import Corners from '@/components/LightBars/Experience/World/Corners'

export default class World {
  experience: Experience
  scene: Experience['scene']
  resources: Experience['resources']
  environment!: Environment
  floor!: Floor
  corners!: Corners
  textBottom!: TextBottom
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.resources.on('ready', () => {
      this.floor = new Floor()
      this.environment = new Environment()
      this.corners = new Corners()
      this.textBottom = new TextBottom('ABC')
    })
  }

  update() {}

  updateBars(scales: number[]) {
    this.experience.camera.updateCameraTargetY(Math.max(...scales) / 2)
    this.corners.updateBars(scales)
  }
}
