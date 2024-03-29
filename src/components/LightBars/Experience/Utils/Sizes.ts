import EventEmitter from './EventEmitter'

export default class Sizes extends EventEmitter {
  width: number
  height: number
  pixelRatio: number
  listener: () => void
  constructor(width: number, height: number) {
    super()
    // Setup
    this.width = width
    this.height = height
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    this.listener = () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.pixelRatio = Math.min(window.devicePixelRatio, 2)

      this.trigger('resize')
    }

    // Resize event
    window.addEventListener('resize', this.listener)
  }

  destroy() {
    window.removeEventListener('resize', this.listener)
  }
}
