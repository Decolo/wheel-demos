var dom = (function() {
    //dom.on(element,eventType,selector,fn)
    //模仿jquery的on方法，有一个一个选择器字符串，用于过滤出被选中的元素中能触发事件的后代元素
    function on(element, eventType, selector, fn) {
        if (!element.nodeType) {
            throw new Eroor('The element is invalid')
        }
        if (!typeof eventType === 'string') {
            throw new Eroor('The eventType is invalid')
        }
        if (!typeof selector === 'string') {
            throw new Eroor('The selector is invalid')
        }
        if (!typeof fn === 'function') {
            throw new Eroor('The callback is invalid')
        }
        element.addEventListener(eventType, event => {
                let eventTarget = event.target
                    //检查触发事件的目标对象的selector，如果返回eventTarget.matches(selector)返回true，跳过循环
                while (!eventTarget.matches(selector)) {
                    //循环到eventTarget指向element，说明selector对应元素不存在，跳出循环
                    if (eventTarget === element) {
                        eventTarget = null
                        break
                    }
                    //eventTarget指向其父元素
                    eventTarget = eventTarget.parentElement
                }
                if (eventTarget) {
                    fn.call(eventTarget, event, eventTarget)
                }
            })
            //返回element，用于链式调用
        return element
    }

    function uniqueClass(element, className) {
        if (!element.nodeType) {
            throw new Eroor('The element is invalid')
        }
        dom.every(element.parentElement.children, node => {
            node.classList.remove(className)
        })
        element.classList.add(className)

        return element
    }

    function every(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(nodeList[i], nodeList[i])
        }
        return nodeList
    }

    function index(element) {
        let nodeList = element.parentElement.children
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i] === element) {
                return i
            }
        }
        return -1
    }
    return {
        on: on,
        every: every,
        uniqueClass: uniqueClass,
        index: index
    }
}())