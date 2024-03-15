/* eslint-disable no-prototype-builtins */
function cloneDeep(targetObj) {
  //防止循环引用
  const map = new WeakMap();

  //原始类型
  if (typeof targetObj !== 'object' || targetObj === null) {
    return targetObj;
  }

  const result = targetObj instanceof Array ? [] : {};

  map.set(targetObj, result);
  //对象自身可枚举属性 除 Symbol
  for (let key in targetObj) {
    if (targetObj.hasOwnProperty(key)) {
      if (map.has(targetObj[key])) {
        result[key] = result;
        continue;
      }

      //递归
      result[key] = cloneDeep(targetObj[key]);
    }
  }

  //自身Symbol属性
  const symbols = Object.getOwnPropertySymbols(targetObj);
  for (let symbol of symbols) {
    result[symbol] = targetObj[symbol];
  }

  return result;
}

const d = { a: "1" }
d.m = d
console.log(cloneDeep(d))

