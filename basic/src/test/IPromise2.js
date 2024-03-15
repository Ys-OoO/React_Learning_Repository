/* eslint-disable no-unused-vars */
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected'

class MyPromise {
  status;
  value;
  resoveedCallback;
  rejectedCallback;

  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.resoveedCallback = [];
    this.rejectedCallback = [];

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(value) {
    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = RESOLVED;
        this.value = value;
        this.resoveedCallback.forEach((cb) => {
          cb(value);
        })
      }
    }, 0)
  }

  reject(errorMsg) {
    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.value = errorMsg;
        this.rejectedCallback.forEach((cb) => {
          cb(errorMsg);
        })
      }
    }, 0)
  }

  then(resolve_cb) {
    if (this.status === PENDING)
      this.resoveedCallback.push(resolve_cb);

    return this;
  }

  catch(reject_cb) {
    if (this.status === PENDING)
      this.rejectedCallback.push(reject_cb);

    return this;
  }
}


Promise.myAll = function (promiseList) {
  //检查promiseList是否可迭代
  if (!promiseList[Symbol.iterator]) {
    throw new TypeError("argument is not a iterable object");
  }

  const iterableObject = Array.from(promiseList);
  return new Promise((resolve, reject) => {
    let res = [];
    let resolvedCount = 0;
    for (const [index, promise] of iterableObject.entries()) {
      Promise.resolve(promise).then(
        value => {
          res[index] = value;
          resolvedCount++;
          if (resolvedCount === iterableObject.length) {
            resolve(res);
          }
        },
        error => {
          return reject(error);
        })
    }
  })
}

let p1 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(1)
  }, 1000)
})
let p2 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2)
  }, 2000)
})
let p3 = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(3)
  }, 3000)
})
const map = new Map();
map.set(1, 2);
map.set(3, 4)
Promise.myAll(map).then(res => {
  console.log(res) // [3, 1, 2]
})


Promise.myRace = function (promiseList) {
  if (!promiseList[Symbol.iterator]) {
    throw new TypeError("argument is not a iterable object");
  }

  const iterableObject = Array.from(promiseList);
  return new Promise((resolve, reject) => {
    for (const promise of iterableObject) {
      //为每个promise注册then方法，将最终Promise状态的改变权力交给他们
      Promise.resolve(promise).then(resolve, reject);
    }
  })
}
Promise.myRace([p1, p2]).then(res => {
  console.log(res) // 1
})

