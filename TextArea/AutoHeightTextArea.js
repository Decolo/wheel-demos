
class AutoHeightTextArea {
  constructor(element) {
    this.element = element || null
    this.element.style.resize = 'none'
    this.initHeight = getComputedStyle(this.element)['height']
    this.curHeight = parseInt(getComputedStyle(this.element)['height'])
    this.bindEvent()
  }
  bindEvent() {
    dom.on(this.element, 'scroll', event => {
      let eventTarget = event.target
      if( eventTarget.scrollHeight > eventTarget.clientHeight ) {
        this.curHeight = eventTarget.style.height = eventTarget.scrollHeight + 'px'
      }
    })
    dom.on(this.element, 'blur' , event => {
      event.target.style.height = this.initHeight
    })
    dom.on(this.element, 'focus' , event => {
      event.target.style.height = this.curHeight
    })
  }
}