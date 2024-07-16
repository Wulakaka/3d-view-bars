import Experience from '../Experience'

export default class Time {
  experience: Experience
  current = Date.now()
  start = this.current
  elapsed = 0
  delta = 16
  isDestroyed = false
  constructor(experience: Experience) {
    this.experience = experience
    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  tick() {
    if (this.isDestroyed) return
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start
    this.experience.subjectTick.next()
    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  destroy() {
    this.isDestroyed = true
  }
}
