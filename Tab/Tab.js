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
        let that = this
        this.$tabHeader.on('click', 'li', function(event) {
            let $li = $(this)
            let index = $li.index()
            that.$tabContent.children().removeClass('active')
            that.$tabHeader.children().removeClass('active')
            that.$category.removeClass('active')
            that.$category.eq(index).addClass('active')
            that.$tabContent.children().eq(index).addClass('active')
            $li.addClass('active')
                // console.log(this.ctWidth)
            that.$tabContent.css({
                overflow: 'hidden'
            })
            that.$picBp.eq(index).css({
                position: 'absolute',
                left: that.ctWidth
            })
            that.$picBp.eq(index).animate({
                left: 0
            }, 200)
        })
    }
}