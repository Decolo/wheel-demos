class Rate {
  constructor(selector) {
    this.container = document.querySelector(selector)
    this.init().bindEvent()
    this.totalStar = 5
  }
  init() {
    let template =`
    <ul class="rate-options">
      <li>☆
      <li>☆
      <li>☆
      <li>☆
      <li>☆
    </ul>
    `
    this.container.innerHTML = template
    this.options = this.container.querySelector('.rate-options')
    // this.showString = '★★★★★☆☆☆☆☆'
    // this.show(0)
    return this
  }
  bindEvent() {
    dom.on(this.options, 'click', 'li', event => {
      let target = event.target
      let index = dom.index(target) + 1
      this.render(index)
    })
  }
  render(index) {
    let arrFill = Array(index).fill('<li>★</li>')
    let arrLi = arrFill.concat(Array(this.totalStar - index).fill('<li>☆</li>'))
    this.options.innerHTML = arrLi.join('')
  }
}