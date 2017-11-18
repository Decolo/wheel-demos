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
    // first item
    dom.text(this.selectButton, this.dataSource[0])
    this.itemHeight = dom.height(this.selectButton)
    dom.height(this.selectItems, this.itemHeight) 
  }
  render() {
    // template items
    const listStr = this.dataSource.map(item => `<li>${item}</li>`).join('')
    // render items
    dom.html(this.selectItems, listStr)
  }
  bindEvent() {
    dom.on(this.selectButton, 'click', () => {
      event.stopPropagation()
      dom.css(this.selectButton, {
        display: 'none'
      })
      dom.addClass(this.selectItems, 'active')
      dom.height(this.selectItems, this.itemHeight * this.dataSource.length)
      this.render()
    })
    dom.on(this.selectItems, 'click', 'li', event => {
      dom.text(this.selectButton, dom.text(event.target))
      // reset itemHeight
      dom.height(this.selectItems, this.itemHeight)
      dom.html(this.selectItems, '')
      dom.css(this.selectButton, {
        display: 'block'
      })
    })
    dom.on(document, 'click', () => {
      dom.removeClass(this.selectItems, 'active')
    })
  }
}

