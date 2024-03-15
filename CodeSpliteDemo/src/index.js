export default {
  x: 1
}

document.getElementById("btn").addEventListener('click', () => {
  import('react').then(() => {
    console.log("react 动态引入成功")
  })
})

// new Promise((resolve) => {
//   setTimeout(resolve, 100)
// })