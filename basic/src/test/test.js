//类似一个任务队列，可链式调用，等待执行
function asyncDo(name) {
  const tasks = [];

  tasks.push(() => {
    console.log('default task ' + name);
  });

  function wait(time) {
    tasks.push(() => {
      console.log('等待' + time);

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, time * 1000);
      });
    });
    return this;
  }

  function waitFirst(time) {
    tasks.unshift(() => {
      console.log('等待' + time);

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, time * 1000);
      });
    });
    return this;
  }

  function dosome(task) {
    tasks.push(() => {
      console.log('执行任务:' + task);
    });
    return this;
  }

  async function execute() {
    console.log(tasks);
    for (let task of tasks) {
      await task();
    }
    return this;
  }

  return {
    wait,
    waitFirst,
    do: dosome,
    execute,
  };
}

export { asyncDo };

