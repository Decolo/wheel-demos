
class FixNav {
  /**
   * @param    {String}  selector
   * @param    {Array}   items
   */
  constructor(selector, items) {
    this.container = document.querySelector(selector)
    this.items = items
    this.count = this.items.length
    this.pageHeight = parseInt(window.getComputedStyle(this.container)['height']) / this.count
    this.init(this.items).bindEvent()
  }

  init(items) {    
    const liArr = items.map(item => `<li>${String(item)}</li>`)
    const ulTemplate = `
      <ul>
        ${liArr.join('')}
      </ul>
    `
    this.nav = document.createElement('nav')
    dom.addClass(this.nav, 'nav')
    dom.html(this.nav, ulTemplate)
    dom.append(this.container, this.nav)
    this.navList = this.nav.children[0].children
    dom.addClass(this.navList[0], 'active')
    return this
  }


  bindEvent() {
    // this.pageHeightHalf = Math.ceil(this.pageHeight / 2)
    dom.on(document, 'scroll', () => {
      let scrollTop = window.scrollY
      let index = Math.round(scrollTop / this.pageHeight) 
      Array.from(this.navList).forEach(item => {
        item.classList.remove('active')
        // dom.removeClass(item, 'active')
      })
      this.navList[index].classList.add('active')
      // dom.addClass(this.navList[index], 'active')
    })
    dom.on(this.container, 'click', 'li', event => {
      let index = dom.index(event.target)
      window.scrollTo(0, index * this.pageHeight)
    })
  }
}