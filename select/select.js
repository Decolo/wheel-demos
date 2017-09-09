// items [value, value, value]
// init: items[0]

/**
 * @param {String} selector
 * @param {Array} selecor 
 */


class Select {
  constructor(selector, items) {
    this.selectContainer = dom.find(document, selector)
    this.dataSource = items
    this.selectButton = dom.find(this.selectContainer, '.select-button')
    this.selectItems = dom.find(this.selectContainer, '.select-items')
    this.init()
    this.bindEvent()
  }
  init() {
    dom.text(this.selectButton, this.dataSource[0])
    const listStr = this.dataSource.map(item => `<li>${item}</li>`).join('')
    dom.html(this.selectItems, listStr)
  }
  bindEvent() {
    dom.on(this.selectButton, 'click', () => {
      event.stopPropagation()
      dom.addClass(this.selectItems, 'active')
    })
    dom.on(this.selectItems, 'click', 'li', event => {
      
      dom.text(this.selectButton, dom.text(event.target))
    })
    dom.on(document, 'click', () => {
      dom.removeClass(this.selectItems, 'active')
    })
  }
}

