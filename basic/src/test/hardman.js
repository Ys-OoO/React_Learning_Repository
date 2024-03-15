function HardMan(str) {

  const taskQuene = [];


  async function study() {
    taskQuene.push(() => {
      console.log(str);
    })
    for (const task of taskQuene) {
      await task();
    }
    return this;
  }

  function reset(cb) {
    taskQuene.push(() => {
      return new Promise((resolve) => {
        cb()
        setTimeout(resolve, 5 * 1000)
      })
    })
    return this;
  }

  function resetFirst(cb) {
    taskQuene.unshift(() => {
      return new Promise((resolve) => {
        cb()
        setTimeout(resolve, 10 * 1000)
      })
    })
    return this;
  }

  return {
    study,
    reset,
    resetFirst,
  }
}

HardMan("ys will study")
  .reset(() => { console.log("等待5s") })
  .resetFirst(() => { console.log("等待10s") })
  .study()