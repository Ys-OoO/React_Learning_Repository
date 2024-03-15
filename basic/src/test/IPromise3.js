const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";

class IPromise {
  status;
  resolved_cb;
  rejected_cb;
  value;

  constructor(executor) {
    this.status = PENDING;
    this.resolved_cb = [];
    this.rejected_cb = [];
    this.value = undefined;
    try {
      executor.apply(this, [this.resolve.bind(this), this.reject.bind(this)]);
    } catch (error) {
      this.rejected_cb(error);
    }
  }

  resolve(value) {
    setTimeout(() => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED;
        for (let i = 0; i < this.resolved_cb.length; i++) {
          this.resolved_cb[i](value);
        }
      }
    }, 0);
  }

  reject(error) {
    setTimeout(() => {
      if (this.status === PENDING) {
        this.value = error;
        this.status = REJECTED;
        for (let i = 0; i < this.rejected_cb.length; i++) {
          this.rejected_cb[i](error);
        }
      }
    }, 0)
  }

  then(cb) {
    this.resolved_cb.push(cb)
    return this;
  }

  catch(cb) {
    this.rejected_cb.push(cb);
    return this;
  }

}

new IPromise((resolve, reject) => {
  console.log("同步逻辑.... ---1");
  setTimeout(() => {
    console.log("异步函数执行 ---2");
    resolve("异步处理完成");
  }, 2000)
}).then((res) => {
  console.log("then调用 处理异步结果 ---3 " + res);
  setTimeout(() => {
    console.log("异步函数执行 ---5");
  }, 1)
  return "then 结束";
}).then((res) => {
  console.log("最后一个then ---4", res);
})