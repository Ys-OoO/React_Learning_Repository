/* eslint-disable no-unused-vars */
//高阶函数的使用

/**
 * @param {Function} func 
 */
function _new(func) {
  //创建实例对象，初始为空
  let res = {};

  //维护原型&原型链
  if (func.prototype !== null) {
    res.__proto__ = func.prototype;
  } else {
    throw new TypeError("First param should be a constructor");
  }

  //绑定this为res，并将参数传递给func并调用
  const ret = func.apply(res, Array.from(arguments).slice(1))

  //如果构造函数有返回值，那么返回
  if (ret) {
    return ret;
  }

  return res;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = () => {
  console.log('my name is ' + this.name)
}

const person = _new(Person, 'ys', 24);
person.say()

/**
 * @param {function} func 每次循环的回调函数
 * @param {*} cb_this 回到函数中的this
 */
Array.prototype._map = function (func, cb_this) {
  //循环次数
  const length = this.length;

  if (typeof func !== 'function') {
    throw new TypeError("First param should be a function")
  }
  //初始化结果
  let res = new Array(length).fill(undefined);

  let k = 0;
  while (k < length) {
    //调用回调，将内部this指向thisArg，并传递所需参数
    res[k] = func.apply(cb_this, [this[k], k, this])
    k++;
  }
  return res;
}


const arr = [1, 2, 3];
const newArr = arr._map(function (item, index, arr) {
  console.log(item, index, arr, this)
  return item + 1
}, person)


/**
 * @param {function} func 每次循环的回调函数
 * @param {*} cb_this 回到函数中的this
 */
Array.prototype._forEach = function (func, cb_this) {
  //循环次数
  const length = this.length;

  if (typeof func !== 'function') {
    throw new TypeError("First param should be a function")
  }

  let k = 0;
  while (k < length) {
    //调用回调，将内部this指向thisArg，并传递所需参数
    func.apply(cb_this, [this[k], k, this])
    k++;
  }
}