
var dom = (function() {
  /**
   * 事件绑定
   * @param                {HTMLElement} element 输入框元素
   * @param                {String} eventType 事件类型
   * @param                {String} selector 选择器字符串  (可选)
   * @param                {Function} fn 回调函数                
   */
  function on(element, eventType, selector, fn) {
    if (!element.nodeType) {
      throw new Error('The element is invalid')
    } else if (typeof eventType !== 'string') {
      throw new Error('The eventType is invalid')
    } 
    if (arguments.length < 4){
      if (typeof selector === 'function') {
        let fn = selector
        element.addEventListener(eventType, event => {
          fn.call(element, event)
        })
        return element
      } else if (typeof selector === 'string') {
        throw new Error('The callback is needed')
      } else {
        throw new Error('The selector is invalid')
      }
    } else {
      if (typeof selector !== 'string' && typeof fn !== 'function') {
        throw new Error('The selector or callback is invalid ')
      } 
    }
    element.addEventListener(eventType, event => {
      let eventTarget = event.target
      while (!eventTarget.matches(selector)) {
        if (eventTarget === element) {
          eventTarget = null
          break
        }
        eventTarget = eventTarget.parentElement
      }
      if (eventTarget) {
        fn.call(eventTarget, event)
      }
    })
    return element
  }

  /**
   * 移除元素上所有className，并添加一个新的className
   * @param                {HTMLElement} element 目标元素
   * @param                {String} className 选择器字符串
   */
  function uniqueClass(element, className) {
    if (!element.nodeType) {
      throw new Error('The element is invalid')
    }
    dom.every(element.parentElement.children, node => {
      node.classList.remove(className)
    })
    element.classList.add(className)
    return element
  }

  /**
   * 移除元素上所有className，并添加一个新的className
   * @param                {HTMLElement} element 目标元素
   * @param                {String} className 选择器字符串
   */
  function addClass(element, className) {
    element.classList.add(className)
    return element
  }

  /**
   * 移除元素上所有className，并添加一个新的className
   * @param                {HTMLElement} element 目标元素
   * @param                {String} className 选择器字符串
   */
  function removeClass(element, className) {
    element.classList.remove(className)
    return element
  }

  /**
   * 给类数组对象的每一项，执行一个回调
   * @param                {NodeList} nodeList 目标元素
   * @param                {String} className 选择器字符串
   */
  function every(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(nodeList[i], nodeList[i])
    }
    return nodeList
  }

  /**
   * 返回指定元素，在同级元素组成的类数组对象中的index
   * @param                {HTMLElement} element 目标元素
   */
  function index(element) {
    let nodeList = element.parentElement.children
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i] === element) {
        return i
      }
    }
    return -1
  }

  /**
   * 给类数组对象的每一项，执行一个回调
   * @param                {HTMLElement} element 目标元素
   * @param                {PlainObject} obj 选择器字符串
   */
  function css(element, obj) {
    for(let key of Object.keys(obj)){
      if (typeof obj[key] !== 'string') {
        return 
      } 
      element.style[key] = obj[key]
    }
    return element
  }

  /**
   * 若context为undefined，就输出元素及其后台元素中的合并文本
   * 若context为String实例, 将元素的文本设成context, 并且会删除后台元素 
   * @param                {HTMLElement} element 目标元素
   * @param                {String} context 目标元素
   */
  function text(element, context) {
    if (context === undefined) {
      return element.innerText
    } else if (typeof context === 'string' || typeof context === 'number') {
      element.innerText = context
      return element
    } else {
      return null
    }
  }

  /**
   * 若context为undefined，就输出元素及其后台元素中的合并文本
   * 若context为String实例, 将元素的文本设成context, 并且会删除后台元素 
   * @param                {HTMLElement} element 目标元素
   * @param                {String} context
   */
  function html(element, context) {
    if (context === undefined) {
      return element.innerHTML
    } else if (typeof context === 'string') {
      element.innerHTML = context
      return element
    } else {
      return null
    }
  }

  /**
   * 若context为undefined，就输出元素及其后台元素中的合并文本
   * 若context为String实例, 将元素的文本设成context, 并且会删除后台元素 
   * @param                {HTMLElement} element 目标元素
   * @param                {String} context 
   */
  function find(element, selector) {
    if (typeof selector === 'string') {
      const elements = element.querySelectorAll(selector)
      if (element.length < 1) {
        return []
      } else if (elements.length === 1) {
        return elements[0]
      } else {
        return elements
      }
    } else {
      throw new Error('selector should be string')
    }
  }

 /**
   * 若context为undefined，就输出元素及其后台元素中的合并文本
   * 若context为String实例, 将元素的文本设成context, 并且会删除后台元素 
   * @param                {HTMLElement} element 目标元素
   * @param                {Number} minRange 最小滑动距离
   * @param                {Function} fn 回调函数
   */
  function swiper(element, minRange = 10, fn) {
    let xStart, yStart, xDiff, yDiff

    element.addEventListener('touchstart', event => {
      xStart = event.touches[0].clientX
      yStart = event.touches[0].clientY
    })
    
    element.addEventListener('touchmove', event => {
      if (!xStart || !yStart) {
        return
      }

      xDiff = event.touches[0].clientX - xStart
      yDiff = event.touches[0].clientY - yStart

      if (Math.abs(xDiff) < minRange && Math.abs(yDiff) < minRange) {
        return 
      }
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        // 左右滑动
        if (xDiff > 0) {
          console.log('right')
          fn.call(element, event, 'right')
        } else {
          console.log('left')
          fn.call(element, event, 'left')
        }
      } else {
        // 上下滑动
        if (yDiff > 0) {
          console.log('down')
          fn.call(element, event, 'down')
        } else {
          console.log('up')
          fn.call(element, event, 'up')
        }
      }
      xStart = yStart = xDiff = yDiff = null
    })

  }

  return {
    on,
    every,
    uniqueClass,
    addClass,
    removeClass,
    index,
    text,
    html,
    find,
    css,
    swiper
  }
}())
