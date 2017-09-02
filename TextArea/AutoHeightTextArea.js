
class AutoHeightTextArea {
  constructor(element) {
    this.element = element || null
    this.element.style.resize = 'none'
    this.element.style
    this.bindEvent()
  }
  bindEvent() {
    dom.on(this.element, 'scroll', event => {
      console.log('what?')
      let eventTarget = event.target
      if( eventTarget.scrollHeight > eventTarget.clientHeight ) {
        eventTarget.style.height = eventTarget.scrollHeight + 'px'
      }
      // let height = eventTarget.clientHeight
      // eventTarget.style.height = height + 5 + 'px'
    })
  }
}