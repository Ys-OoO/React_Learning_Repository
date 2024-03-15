/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
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


Array.prototype.snail = function (rowsCount, colsCount) {
  const res = [];
  //无效输入
  if (this.length !== rowsCount * colsCount) return res;
  //构建矩阵
  for (let i = 0; i < rowsCount; i++) {
    const initRow = new Array(colsCount).fill(0);
    res.push(initRow);
  }
  //列初始值
  let curCol = 0;
  let index = 0;
  let next = this[0];
  while (true) {

    //从上向下填充
    for (let i = 0; i < rowsCount; i++) {
      res[i][curCol] = next;
      index++;
      next = this[index];
    }
    curCol++;
    if (curCol === colsCount) {
      break;
    }
    //从下向上填充
    for (let i = rowsCount - 1; i >= 0; i--) {
      res[i][curCol] = next;
      index++;
      next = this[index];
    }
    curCol++;
    if (curCol === colsCount) {
      break;
    }
  }
  return res;
}


function checkArray(object) {
  // return Array.isArray();
  return Object.prototype.toString.call(object, null) === "[object Array]"
}
/**
* @param {Array} arr
* @param {number} depth
* @return {Array}
*/
var flat = function (arr, n) {
  if (n === 0) {
    return arr;
  }


  while (n--) {
    //扁平化一层
    for (let i = 0; i < arr.length; i++) {
      if (checkArray(arr[i])) {
        const offset = arr[i].length - 1;
        arr.splice(i, 1, ...arr[i]);
        i += offset
      }
    }
  }
  return arr;
};

console.log(flat([1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 1))

class TrieNode {
  constructor() {
    this.children = new Map();
    this.val = undefined;
    this.hasVal = false;
  }
}

function memoize(fn) {
  this.root = new TrieNode();
  return function (...args) {
    // debugger
    let curTrieNode = this.root;


    //遍历 并 构造 Trie树，找到当前参数序列所对应的最后一个TrieNode
    for (let i = 0; i < args.length; i++) {
      const curArg = args[i];

      if (curTrieNode.children.has(curArg)) {
        curTrieNode = curTrieNode.children.get(curArg);

      } else {
        //没有了，则后续参数都要顺序添加入Trie树
        const newNode = new TrieNode();
        curTrieNode.children.set(curArg, newNode);
        curTrieNode = newNode;
      }
    }

    if (!curTrieNode.hasVal) {
      curTrieNode.val = fn(...args);
      curTrieNode.hasVal = true;
    }
    return curTrieNode.val;
  }
}


let count = 0;
const inputs = [[]]
const memoized = memoize(function (...arr) { return arr.reduce((a, b) => a + b, 0); });
for (const arr of inputs) {
  memoized(...arr);
}

function debounce(fn, delay) {
  let timer = null;

  return function (...args) {
    clearInterval(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  }
}

function throttle(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  }
}




/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */
var timeLimit = function (fn, t) {
  return async function (...args) {
    let timer = null;
    return new Promise((resolve, reject) => {
      timer = setTimeout(() => {
        reject("Time Limit Exceeded");
      }, t)
      //为promise注册then，使其能够resolve当前的promise
      Promise.resolve(fn.apply(this, args)).then(resolve, reject).finally(() => clearInterval(timer));
    })
  }
};


const limited = timeLimit(() => 1, 10);
const p = limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms000514


console.log(p);

function runAsync(x) {
  const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
  return p
}
function runReject(x) {
  const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x))
  return p
}
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then(res => console.log(res))
  .catch(err => console.log(err))


function getType(value) {
  //判断null
  if (typeof value === 'object' && value === null) {
    return 'null'
  }

  //判断Undefined Number String Symbol Function BigInt Object等内置对象 
  let type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase();

  //判断NaN
  if (type === 'number') {
    return Number.isNaN(value) ? "NaN" : type;
  }

  //判断自定义类
  if (type === 'object') {
    return value.constructor.name;
  }

  return type;
}