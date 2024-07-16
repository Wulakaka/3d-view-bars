import Experience from '../Experience'
export default class Sizes {
  experience: Experience
  width: number
  height: number
  pixelRatio = Math.min(window.devicePixelRatio, 2)
  resizeListener = () => {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    this.experience.subjectResize.next()
  }
  constructor(experience: Experience, width: number, height: number) {
    this.experience = experience
    // Setup
    this.width = width
    this.height = height

    // Resize event
    window.addEventListener('resize', this.resizeListener)
  }

  destroy() {
    window.removeEventListener('resize', this.resizeListener)
  }
}
