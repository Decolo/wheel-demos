
let startX = 0, startY = 0
box.addEventListener('dragstart', event => {
  let box = event.target
  box.style.left = box.offsetLeft + 'px'
  box.style.top = box.offsetTop + 'px'
  box.parentNode.style.position = 'relative'
  box.style.position = 'absolute'
  startX = box.offsetLeft
  startY = box.offsetTop
})

box.addEventListener('dragend', event => {
  let box = event.target
  let endX = event.clientX
  let endY = event.clientY
  let disX = endX - startX
  let disY = endY - startY - box.clientHeight
  box.style.left = box.offsetLeft + disX + 'px'
  box.style.top = box.offsetTop + disY + 'px'
})

