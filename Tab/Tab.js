// var $ = require('jquery')
class Tab {
    constructor(selector) {
        let $container = $(selector)
        this.ctWidth = $container.width()
        this.$tabHeader = $container.find('.tab-header')
        this.$tabContent = $container.find('.tab-content')
        this.$picBp = this.$tabContent.find('.pic-bp')
        this.$category = this.$tabHeader.find('.category')
        this.bindEvent()

    }
    bindEvent() {
        this.$tabHeader.on('click', 'li', (event) => {
            let $li = $(event.currentTarget)
            let index = $li.index()
            this.$tabContent.children().removeClass('active')
            this.$tabHeader.children().removeClass('active')
            this.$category.removeClass('active')
            this.$category.eq(index).addClass('active')
            this.$tabContent.children().eq(index).addClass('active')
            $li.addClass('active')
                // console.log(this.ctWidth)
            this.$tabContent.css({
                overflow: 'hidden'
            })
            this.$picBp.eq(index).css({
                position: 'absolute',
                left: this.ctWidth
            })
            this.$picBp.eq(index).animate({
                left: 0
            }, 200)
        })
    }
}