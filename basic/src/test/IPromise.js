/* eslint-disable no-cond-assign */
/* eslint-disable no-unused-vars */
class IPromise {

  #thenCallback = [];
  #rejectCallback = [];

  constructor(executor) {
    executor(this.#resolve.bind(this), this.#reject.bind(this));
  }

  #resolve(value) {
    const run = () => {
      let cur_cb = null;
      while (this.#thenCallback.length) {
        cur_cb = this.#thenCallback.shift();
        cur_cb(value);
      }
    }
    setTimeout(run, 0);
  }

  #reject(value) {
    setTimeout(() => {
      // this.#rejectCallback.length && this.#rejectCallback(value);
    }, 0)
  }

  then(then_cb, reject_cb) {
    //注册then的回调
    this.#thenCallback.push(then_cb);
    //注册reject的回调
    this.#rejectCallback.push(reject_cb);

    return this;
  }

  catch(errorCallback) {
    //注册catch异常回调
    this.then(null, errorCallback);
  }
}

//--test



const pending = 'PENDING'
const resolved = 'RESOLVED'
const rejected = 'REJECTED'

const isFunction = (fn) => typeof fn === 'function'

class MyPromise2 {
  constructor(executor) {
    this.onResolvedQueue = []
    this.onRejectedQueue = []
    this._value = undefined
    this._status = pending
    executor(this._resolve.bind(this), this._reject.bind(this))
  }

  _resolve(value) {
    if (!pending) return
    const run = () => {
      this._status = resolved
      let cb;
      // 执行队列中收集的回调，执行一个，删除一个，
      // 队列思路：先进先出
      while (cb = this.onResolvedQueue.shift()) {
        this._value = value
        cb(value)
      }
    }

    setTimeout(run, 0)
  }

  _reject(value) {
    if (!pending) return
    const run = () => {
      this._status = rejected
      this._value = value
      if (this.onRejectedQueue.length == 0) {
        throw new Error(value)
      }
      let cb
      while (cb = this.onRejectedQueue.shift()) {
        cb(value)
      }
    }

    setTimeout(run, 0)
  }

  then(onResolved, onRejected) {
    const { _status, _value } = this
    return new MyPromise2((resolveNext, rejectNext) => {
      const _resolved = (value) => {
        try {
          if (!isFunction(onResolved)) {
            resolveNext(value)
          } else {
            const res = onResolved(value)
            if (res instanceof MyPromise2) {
              res.then(resolveNext, rejectNext)
            } else {
              resolveNext(res)
            }
          }
        } catch (err) {
          rejectNext(err)
        }
      }

      const _rejected = (value) => {
        try {
          if (!isFunction(onRejected)) {
            rejectNext(value)
          } else {
            const res = onRejected(value)
            if (res instanceof MyPromise2) {
              res.then(resolveNext, rejectNext)
            } else {
              resolveNext(res)
            }
          }
        } catch (err) {
          rejectNext(err)
        }
      }

      switch (_status) {
        // 状态为 pending 时，收集回调
        case pending:
          this.onResolvedQueue.push(_resolved)
          this.onRejectedQueue.push(_rejected)
          break
        // 状态已经改变了，就直接执行回调
        case resolved:
          _resolved(_value)
          break
        case rejected:
          _rejected(_value)
          break
      }
    })
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }
}


// const ipromise = new MyPromise2((resolve, reject) => {
//   console.log("同步逻辑.... ---1");
//   setTimeout(() => {
//     console.log("异步函数执行 ---2");
//     resolve("异步处理完成");
//   }, 2000)
// }).then((res) => {
//   console.log("then调用 处理异步结果 ---3 " + res);
//   setTimeout(() => {
//     console.log("异步函数执行 ---4");
//   }, 2000)
//   return "then 结束";
// }).then((res) => {
//   console.log("最后一个then ---5", res);
// })
