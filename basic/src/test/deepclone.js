function deepClone(value) {
  if (typeof value !== 'object') {
    return value;
  }

  if (typeof value === 'object' && value == null) {
    return value;
  }

  const set = new WeakSet();
  set.add(value);
  const isArray = value instanceof Array;
  const res = isArray ? [] : {};

  const symbols = Object.getOwnPropertySymbols(value);

  symbols.forEach(key => {
    res[key] = value[key];
  })

  for (const key in value) {
    if (Object.hasOwnProperty.call(value, key)) {
      if (set.has(value[key])) {
        res[key] = res;
        continue;
      }
      res[key] = deepClone(value[key]);
    }
  }
  return res;
}

const sym = Symbol('sym')
const obj = {
  arr: [1, 2, { ar1: '3' }],
  a: { b: 1 },
  c: undefined,
  d: null,
  [sym]: "a",

}
obj.self = obj;
const copy = deepClone(obj);

copy.arr[2].ar1 = 'xxx';

console.log(copy, obj)