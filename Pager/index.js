
class Pager {
  constructor(options){
    this.defaultOptions = {
      total: 100,
      initPage: 1,
      limit: 10,
      callback: null, 
      params: null
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
    // init container
    this.pager = document.createElement('div')
    this.pager.classList.add('pager')
    this.pager.innerHTML = template
    this.pagesContainer = this.pager.querySelector('.btn-pages')
    // init button
    this.firstPageBtn = this.pager.querySelector('.first')
    this.lastPageBtn = this.pager.querySelector('.last')
    this.preBtn = this.pager.querySelector('.pre')
    this.nextBtn = this.pager.querySelector('.next')
    // init li
    let { limit, initPage } = this.options
    this.render(this.page, this.page + limit - 1, initPage)
    // insert
    document.body.appendChild(this.pager)
    return this
  }
  render(start, end, current) {
    let liStr = ''
    for(let i = start; i <= end; i++) {
      // comfirm the current
      if (i === current) {
        liStr += `<li data-index=${i} class="current-page">${i}</li>`  
      } else {
        liStr += `<li data-index=${i}>${i}</li>`
      }
    }
    // render lis
    this.pagesContainer.innerHTML = liStr
  }
  bindEvent() {
    let { total } = this.options
    dom.on(this.firstPageBtn, 'click', event => {
      this.gotoPage(1)
    })
    dom.on(this.lastPageBtn, 'click', event => {
      this.gotoPage(total)
    })
    dom.on(this.preBtn, 'click', event => {
      this.gotoPage(this.page - 1)
    })
    dom.on(this.nextBtn, 'click', event => {
      this.gotoPage(this.page - 1)
    })
    console.log(this.pagesContainer)
    dom.on(this.pagesContainer, 'click', 'li', event => {
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
    // check buttons
    this.checkButton()
    let { total, limit, callback, params } = this.options
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
    this.render(start, end, num)

    // callback
    if (callback) {
      callback(num, limit)
    }
    // url change
    if (params) {
      let paramStr = this.parse(params)
      let url = location.href
      let index = url.indexOf('?') 
      if (index === -1) {
        location.replace(url + paramStr)
      } else {
        url = url.substr(0, index) + paramStr
        location.replace(url)
      }
    }
  }
  parse(obj) {
    let arr = []
    for (let key in obj) {
      arr.push(`${key}=${encodeURI(obj[key])}`)
    }
    return `?${arr.join('&')}`
  }
}

