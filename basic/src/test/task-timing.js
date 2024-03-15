const bfcBox = document.getElementsByClassName("bfc")
Promise.resolve("promise").then((res) => {
  console.log(res)
});

setTimeout(() => {
  bfcBox[0].style.backgroundColor = "red"
  console.log("setTimeout")
})

requestAnimationFrame(() => {
  console.log("raf")
})


const mutationObserver = new MutationObserver(() => {
  console.log("Mutation Observer")
})

mutationObserver.observe(bfcBox[0], { attributes: true })

const intersectionObserver = new IntersectionObserver(() => {
  console.log("Intersection Observer")
})

intersectionObserver.observe(bfcBox[0])