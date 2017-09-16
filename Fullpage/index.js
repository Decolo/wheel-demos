class Fullpage {
  constructor(selector = '', duration = 1, minRange = 30) {
    if (typeof selector !== 'string') return
    if (typeof duration !== 'number') return
    if (typeof minRange !== 'number') return
    this.container = document.querySelector(selector)
    this.pages = this.container.children
    this.count = this.pages.length
    this.duration = duration
    this.minRange = minRange
    this.animating = false
    this.currentIndex = 0
    this.init().bindEvent()
  }

  init() {
    dom.css(this.container, {
      overflow: 'hidden'
    })
    dom.every(this.pages, page => {
      dom.css(page, {
        transition: `transform ${this.duration}s`
      })
    })
    return this
  }

  bindEvent() {
    dom.every(this.pages, page => {
      dom.swiper(page, this.minRange, (event, direction) => {
        // if (this.currentIndex === 0 || this.currentIndex === this.count - 1 || this.animating) return 
        if (direction === 'up') {
          if (this.currentIndex === this.count - 1) return 
          dom.every(this.pages, page => {
            dom.css(page, {
              transform: `translateY(-${100*(this.currentIndex + 1)}%)`
            })
          })
          this.currentIndex++
        } else if (direction === 'down') {
          if (this.currentIndex === 0) return 
          dom.every(this.pages, page => {
            dom.css(page, {
              transform: `translateY(-${100*(this.currentIndex - 1)}%)`
            })
          })
          this.currentIndex--
        }
      })
    })
  }
}