// 两个参数count， limit， count总页数， limit每一页的数字按钮个数
// 当前页数current
// 根据以上三个初始化

class Pager {
  constructor(options){
    this.defaultOptions = {
      total: 100,
      initPage: 1,
      limit: 10
    }
    this.options = Object.assign({}, this.defaultOptions, options)
    this.page = this.options.initPage
    this.init().bindEvent()
  }
  init() {
    let template = `
      <div class="btn-pre">
          <button class="first">首页</button>
          <button class="pre">上一页</button>
      </div>
      <ol class="btn-pages"> 
      </ol>
      <div class="btn-next">
          <button class="next">下一页</button>
          <button class="last">末页</button>
      </div>
    `
    this.pager = document.createElement('div')
    this.pager.classList.add('pager')
    this.pager.innerHTML = template
    this.firstPageBtn = this.pager.querySelector('.first')
    this.lastPageBtn = this.pager.querySelecotr('.last')
    this.preBtn = this.pager.querySelector('.pre')
    this.nextBtn = this.pager.querySelector('.next')
    this.pagesContainer = this.pager.querySelector('.btn-pages')
    let { limit } = this.options
    this.render(this.page, this.page + limit - 1)
    return this
  }
  render(start, end) {
    let liStr = ''
    for(let i = start; i <= end; i++) {
      liStr += `<li>${i}</li>`
    }
    this.pagesContainer.innerHTML = liStr
  }
  bindEvent() {
    let { total } = this.options
    dom.on(this.firstPageBtn, 'click', event => {
      this.gotoPage(1)
    })
    dom.on(this.firstPageBtn, 'click', event => {
      this.gotoPage(total)
    })
    dom.on(this.preBtn, 'click', event => {
      this.gotoPage(this.page - 1)
    })
    dom.on(this.nextBtn, 'click', event => {
      this.gotoPage(this.page - 1)
    })
    dom.on(this.pagesContainer, 'li', 'click', event => {
      this.gotoPage(Number(event.target.innerText))
    })
  }
  checkButton() {
    let { total } = this.options
    if (this.page === 1) {
      this.firstPageBtn.setAttribute('disabled', '')
      this.preBtn.setAttribute('disabled', '')
    } else {
      this.firstPageBtn.removeAttribute('disabled')
      this.preBtn.removeAttribute('disabled')
    }
    if (this.page === total) {
      this.lastPageBtn.setAttribute('disabled', '')
      this.nextBtn.setAttribute('disabled', '')
    } else {
      this.lastPageBtn.removeAttribute('disabled')
      this.nextBtn.removeAttribute('disabled')
    }
  }
  gotoPage(num) {
    this.page = num
    this.checkButton()
    let { total, limit } = this.options
    let start = 0, end = 0
    if (num <= Math.ceil(limit / 2)) {
      start = 1
      end = limit
    } else if (num > total - Math.floor(limit / 2)) {
      end = total
      start = total - limit + 1
    } else {
      start = num - Math.floor(limit / 2)
      end = start + limit - 1
    }
    this.render(start, end)
  }
}