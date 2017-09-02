class Tab {
  constructor(options) {
    let defaultOptions = {
      element: null,
      navSelector: '[data-role="tab-nav"]',
      paneSelector: '[data-role="tab-pane"]',
      activeClassName: 'active'
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.bindEvent().setDefault()
  }
  bindEvent() {
    if (!this.options.element) {
      throw new Error('element is required')
    } else {
      dom.on(this.options.element, 'click', `${this.options.navSelector}>li`, (event, eventTarget) => {
        console.log(eventTarget)
        debugger
        dom.uniqueClass(eventTarget, this.options.activeClassName)
        let index = dom.index(eventTarget)
        let panes = this.options.element.querySelectorAll(this.options.paneSelector)[0].children
        dom.uniqueClass(panes[index], this.options.activeClassName)
      })
    }
    return this
  }
  setDefault() {
    this.options.element.querySelector(`${this.options.navSelector}>li:first-child`).click()
    return this
  }
}