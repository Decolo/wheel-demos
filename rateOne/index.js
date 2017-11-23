class Rate {
  constructor(selector) {
    this.container = document.querySelector(selector)
    console.log(this.container)
    this.init()
    this.bind()
  }
  init() {
    let template =`
    <ul class="rate-options">
      <li>一星</li>
      <li>二星</li>
      <li>三星</li>
      <li>四星</li>
      <li>五星</li>
    </ul>
    <p class="rate-display"></p>
    `
    this.container.innerHTML = template
    this.options = this.container.querySelector('.rate-options')
    this.display = this.container.querySelector('.rate-display')
    this.showString = '★★★★★☆☆☆☆☆'
    this.show(0)
  }

  show(rate) {
    this.display.innerText = this.showString.substring(5 - rate, 10 - rate)
  }
  bind() {
    this.options.addEventListener('click', event => {
      let target = event.target
      if (target.tagName === 'LI') {
        let index = this.getIndex(target)
        console.log(index)
        this.show(index + 1)
      }
    })
  }
  getIndex(element) {
    let parent = element.parentNode
    let children = parent.children
    for (let i = 0; i < children.length; i++) {
      if (children[i] === element) return i
    }
    return -1
  }
}
