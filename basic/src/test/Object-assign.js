//静态方法将一个或者多个源对象中所有可枚举的自有属性复制到目标对象，并返回修改后的目标对象。
Object.prototype.myAssign = function (target, ...sources) {
  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  let res = Object(target);

  if (!sources.length) return res;

  sources.forEach(nextSource => {
    if (nextSource == null) {
      return;
    }

    for (let key in nextSource) {
      if (nextSource.hasOwnProperty(key) && nextSource[source] !== undefined) {
        res[key] = nextSource[key];
      }
    }
  })

  return res
}


const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.myAssign(target, source);

console.log(target);
// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget === target);
// Expected output: true
