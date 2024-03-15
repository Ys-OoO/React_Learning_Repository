Function.prototype.myCall = function () {

  let argumentsArray = Array.from(arguments);

  //获取新的上下文/this指向 , 不存在就设为window
  let [context] = argumentsArray.splice(0, 1) || window;

  let args = [];
  //获取参数
  if (argumentsArray.length) {
    args = [...argumentsArray];
  }
  //判断this是否是函数类型
  if (typeof this !== 'function') {
    throw new TypeError("myCall is not a function");
  }

  //this指向的是要调用的函数
  //将要调用的函数放入新的上下文中
  context.fn = this;

  return context.fn(...args);
}


Function.prototype.myBind = function (thisArg, ...args) {
  //函数调用时新的上下文
  let context = thisArg || window;

  //在新的上下文中绑定指定函数
  context.fn = this;

  return function (...restArgs) {
    return context.fn(...[...args, ...restArgs])
  }
}

Function.prototype.myApply = function (thisArg, ...args) {

}
function Person(name) {
  this.name = name;
}
Person.prototype.getName = function (a) {
  return this.name;
}
const p = new Person('ys')

console.log(Person.prototype.getName.myBind(p, 1)())
