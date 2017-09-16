class SwiperFade {
  constructor(imgsArr, minRange) {
    this.imgsArr = imgsArr
    this.minRange = minRange || 30 //滑动的最小距离, 默认是30
    this.imgsCount = this.imgsArr.length
    this.imgShowCurIndex = 0
    this.bindEvent()
    this.touchStartX = 0
    this.readyToMove = true //可避免多次move造成错乱
  }
  bindEvent() {
    this.imgsArr.forEach((item) => {
      item.addEventListener('touchstart', this.touchStart.bind(this))
      item.addEventListener('touchend', this.touchEnd.bind(this))
    })
  }
  touchStart(event) {
    event.preventDefault()
    if (this.readyToMove) {
      let touch = event.touches[0]
      this.touchStartX = touch.pageX
      // console.log(this.touchStartX)
    }
  }
  touchEnd(event) {
    event.preventDefault()
    let touch = event.changedTouches[0]
    let touchCurX = touch.pageX
    if (this.touchStartX - touchCurX > this.minRange) { //右滑
      let preIndex = this.imgShowCurIndex
      this.imgShowCurIndex++
      if (this.imgShowCurIndex > 3) {
        this.imgShowCurIndex = 0
        preIndex = 3
      }
      this.showNewImg(this.imgShowCurIndex, preIndex)
    } else if (touchCurX - this.touchStartX > this.minRange) { //左滑
      let preIndex = this.imgShowCurIndex
      this.imgShowCurIndex--
      if (this.imgShowCurIndex < 0) {
        this.imgShowCurIndex = 3
        preIndex = 0
      }
      this.showNewImg(this.imgShowCurIndex, preIndex)
    }
  }
  showNewImg(index, preIndex) {
    this.imgsArr[preIndex].classList.remove('active')
    this.imgsArr[index].classList.add('active')
  }
}


let imgsArr = document.querySelectorAll('.img')
new SwiperFade(imgsArr, 20)