class DraggableBox {
  constructor(selector) {
    this.box = document.querySelector(selector)
    this._x = 0
    this._y = 0
    this.draggable = false
    this.bindEvent()
  }
  bindEvent() {
    this.box.addEventListener('mousedown', event => {
      this.box.classList.add('draggable')
      this.draggable = true
      this._x = event.clientX - this.box.offsetLeft
      this._y = event.clientY - this.box.offsetTop
    })
    document.addEventListener('mousemove', event => {
      if (this.draggable) {
        let dragX = Math.max(100, event.clientX - this._x)
        dragX = Math.min(document.body.clientWidth, dragX)
        let dragY = Math.max(100, event.clientY - this._y)
        //dragY = Math.min(document.body.clientHeight, dragY)
        this.box.style.left =  dragX + 'px'
        this.box.style.top =  dragY + 'px'
      }
    })
    document.addEventListener('mouseup', () => {
      this.box.classList.remove('draggable')
      this.draggable = false
    })
  }
}
