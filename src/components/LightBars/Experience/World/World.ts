import Experience from '../Experience'
import Floor from './Floor'
import Bar from './Bar'
import Environment from './Environment'
import Bars from '@/components/LightBars/Experience/World/Bars'

export default class World {
  experience: Experience
  scene: Experience['scene']
  resources: Experience['resources']
  environment: Environment
  floor: Floor
  bars: Bars
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.resources.on('ready', () => {
      console.log('ready')
      this.floor = new Floor()
      this.environment = new Environment()
      this.bars = new Bars()
    })
  }

  update() {}

  updateBars(scales: number[]) {
    this.bars.updateBars(scales)
  }
}
