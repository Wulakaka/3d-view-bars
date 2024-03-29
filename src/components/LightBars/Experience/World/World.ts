import Experience from '../Experience'
import Floor from './Floor'
import Environment from './Environment'
import Bars from '@/components/LightBars/Experience/World/Bars'
import TextBottom from '@/components/LightBars/Experience/World/TextBottom'

export default class World {
  experience: Experience
  scene: Experience['scene']
  resources: Experience['resources']
  environment!: Environment
  floor!: Floor
  bars!: Bars
  textBottom!: TextBottom
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.resources.on('ready', () => {
      this.floor = new Floor()
      this.environment = new Environment()
      this.bars = new Bars()
      this.textBottom = new TextBottom('ABC')
    })
  }

  update() {}

  updateBars(scales: number[]) {
    this.bars.updateBars(scales)
  }
}
