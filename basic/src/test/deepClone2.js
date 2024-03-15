
function deepClone(targetObject, reference = new WeakSet()) {
  //原始类型 和 Function 直接copy
  if (typeof targetObject !== 'object') {
    return targetObject;
  }
  //特殊处理null
  if (targetObject === null) {
    return null;
  }

  //放在原始类型下，因为WeakSet只存储对象
  reference.add(targetObject);

  const res = Array.isArray(targetObject) ? [] : {};

  //对象类型
  for (const key in targetObject) {
    if (Object.hasOwnProperty.call(targetObject, key)) {
      //判断循环引用
      if (reference.has(targetObject[key])) {
        res[key] = targetObject;
      } else {
        const type = Object.prototype.toString.call(targetObject);
        if (type === '[Object Date]') {
          res[key] = new Date(+targetObject[key]);
        } else if (type === '[Object RegExp]') {
          res[key] = new RegExp(targetObject[key].source);
        } else {
          res[key] = deepClone(targetObject[key], reference);
        }
      }
    }
  }

  //Symbol key
  const symbols = Object.getOwnPropertySymbols(targetObject);
  for (const symbol of symbols) {
    res[symbol] = targetObject[symbol];
  }

  return res;
}


const obj = {
  a: [1, 2, 3],
  [Symbol("x")]: 1,
  info: {
    name: "ys"
  },
  birth: new Date('December 17, 1995 03:24:00'),
  reg: new RegExp("/.js/")
}
obj.self = obj;

console.log()

const obj2 = deepClone(obj);
console.log(obj, obj2)
obj2.info = {}
console.log(obj, obj2)