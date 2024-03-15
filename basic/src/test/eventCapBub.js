const grand = document.getElementById("grand");
const father = document.getElementById("father");
const son = document.getElementById("son");
const sibling = document.getElementById("sibling");



//捕获冒泡
grand.addEventListener('click', function () {
  console.log("grand Bubble")
})
grand.addEventListener('click', function () {
  console.log("grand Capture")
}, true)
father.addEventListener('click', function () {
  console.log("father Bubble")
})
father.addEventListener('click', function () {
  // console.log("click father", event.target, this, event.eventPhase)
  console.log("father Capture")
}, true)

son.addEventListener('click', function () {
  console.log("son Bubble")
})
son.addEventListener('click', function () {
  console.log("son Capture")
}, true)


//事件委托
// const container = document.getElementsByClassName("container");
// let preClickEle = null;
// container[0].addEventListener("click", (event) => {
//   const target = event.target;
//   if (preClickEle) {
//     preClickEle.style.backgroundColor = "";
//   }
//   if (target.parentNode === container[0]) {
//     preClickEle = target;
//     target.style.backgroundColor = "blue"
//   }
// })

//捕获的影响范围
sibling.addEventListener('click', () => {
  console.log("sibling caputure call")
}, { capture: true })