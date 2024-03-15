/* eslint-disable no-unused-vars */
function flow(...funcs) {
  const length = funcs.length;
  let i = length;
  while (i--) {
    if (typeof funcs[i] !== 'function') {
      throw new TypeError('Expected a function');
    }
  }
  return function (innerThis, ...args) {
    let j = 0;
    let result = length ? funcs[j].apply(innerThis, args) : args[0];
    while (++j < length) {
      result = funcs[j].call(innerThis, result);
    }
  };
}

function checkEnv() {
  const env = {
    isMobile: false,
    isAndroid: false,
    isIOS: false,
  };
  const ua = navigator.userAgent;
  env.isMobile = 'ontouchstart' in document;
  env.isAndroid = !!ua.match(/android/);
  env.isIOS = !!ua.match(/iphone/);
  return env;
}

function checkAuth(env) {
  const random = Math.random() * 10;
  if (random < 5) {
    return {
      env,
      isAdmin: false,
    };
  } else {
    return {
      env,
      isAdmin: true,
    };
  }
}

function compose(...funcs) {
  return function () {
    return funcs.reduce((preReturn, curFunc) => {
      return curFunc(preReturn);
    }, funcs[0]?.())
  }
}

console.log(compose(checkEnv, checkAuth)());


var reduce = function (nums, fn, init) {
  let i = 1;
  let result = nums.length ? fn(init, nums[0]) : init;
  while (i < nums.length) {
    result = fn(result, nums[i]);
    i++
  }
  return result
};

let nums = [1, 2, 3, 4]
let fn = function sum(accum, curr) { return accum + curr; }
let init = 0

console.log(reduce(nums, fn, init))

var checkIfInstanceOf = function (obj, classFunction) {

  if (obj === null || obj === undefined || classFunction === null || classFunction === undefined) {
    return false;
  }
  if (obj.__proto__ === classFunction.prototype) return true;

  return checkIfInstanceOf(obj.__proto__, classFunction);
};

console.log(checkIfInstanceOf(5, Number));