
// //校验函数柯里化 模拟底层封装逻辑
// function currying(func, ...args) {
//   const wrapper = function (...thenArgs) {
//     //接收到足够的参数后执行
//     if (args.length + thenArgs.length >= func.length) {
//       console.log('参数满足，开始执行: ' + [...args, ...thenArgs]);
//       return func.apply(func, [...args, ...thenArgs]);
//     } else {
//       //参数不完整，那么就将参数先存起来
//       console.log('参数不足，接收参数为：' + [...thenArgs] + " 所有参数为：" + [...args, ...thenArgs])
//       return currying(func, ...args, ...thenArgs);
//     }
//   }
//   return wrapper;
// }

// function check(reg, checkValue) {
//   return reg.test(checkValue);
// }

// const curryingCheck = currying(check);

// const checkPhone = curryingCheck(/^1[34578]\d{9}$/);
// //模拟底层封装逻辑

// //外部使用
// checkPhone(123);

// //格式化函数柯里化
// function format(unit, array) {
//   return array.map((item) => {
//     return item + unit;
//   })
// }
// const formatCurrying = currying(format);

// const persentFormat = formatCurrying("%");
// const metreFormat = formatCurrying("米");

// console.log(persentFormat([1, 2, 10]));
// console.log(metreFormat([1, 2, 10]))


function currying(fn) {
  if (typeof fn !== "function") {
    throw new TypeError("need a function")
  }
  //收集的参数
  let thisArgs = []

  return function wrapper(...newArgs) {
    if (newArgs.length) {
      //如果传参了则表示还在收集参数
      thisArgs = [...thisArgs, ...newArgs];
      return wrapper;
    } else {
      //调用
      const res = fn.apply(this, thisArgs);
      thisArgs = []; //清空收集的参数
      return res;
    }

  }
}
//--------test
function add(...args) {
  //求和
  return args.reduce((a, b) => a + b)
}

let addCurry = currying(add)
console.log(addCurry(1)(2)(3)(4, 5)())
console.log(addCurry(1)(2)(3, 4, 5)())


