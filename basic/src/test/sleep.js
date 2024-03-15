function timeout(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

(async function () {
  console.log(1);
  await timeout(3000);
  console.log(2)
})()