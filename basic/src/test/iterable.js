//可迭代对象

/**
 * 一个可迭代对象应该有一个名为 Symbol.iterator 的方法，可用于在for..of循环中宏被遍历
 *    Symbol.iterator 的值是迭代器对象(iterator object)
 *        迭代器：一个有 next方法 的对象
 *            next方法：function --- 返回值必须是：{ done:Boolean ,  value:any }
 *              done --- 迭代器是否关闭（是否无法遍历了，类似于连边的next）
 *              value --- 遍历的下一个值
 */


// function IRange(from, to) {
//   this.from = from;
//   this.to = to;
//   this[Symbol.iterator] = function () {
//     const array = new Array(to - from + 1).fill(0).map((_, index) => from + index);
//     return array[Symbol.iterator]();
//   }
// }

function IRange(from, to) {
  this.from = from;
  this.to = to;
  this[Symbol.iterator] = function () {
    let current = this.from;
    const last = this.to;
    return {
      next() {
        if (current <= last) {
          return { done: false, value: current++ };
        } else {
          return { done: true };
        }
      }
    }
  };
  let index = 0;
  for (const item of this) {
    this[index] = item;
    index++;
  }
  this.length = to - from + 1;
}

// function IRange(from, to) {
//   return Array.from({ length: to - from + 1 }, (_, index) => from + index);
// }

const range = new IRange(1, 4)

for (const item of range) {
  console.log(item);
}

let range2 = {
  from: 1,
  to: 5
};

// 1. for..of 调用首先会调用这个：
range2.__proto__[Symbol.iterator] = function () {

  // ……它返回迭代器对象（iterator object）：
  // 2. 接下来，for..of 仅与下面的迭代器对象一起工作，要求它提供下一个值
  return {
    current: this.from,
    last: this.to,

    // 3. next() 在 for..of 的每一轮循环迭代中被调用
    next() {
      // 4. 它将会返回 {done:.., value :...} 格式的对象
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

for (const item of range2) {
  console.log(item);
}



Object.prototype[Symbol.iterator] = function () {
  const arr = [3, 4];
  return arr[Symbol.iterator]();
}
const [a, b] = {
  a: 3,
  b: 4
}
console.log(a, b);