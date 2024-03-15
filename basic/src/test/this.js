// "use strict"
// // const cli = document.getElementById("click");
// const obj = {
//   a: 1,
//   b: function () {
//     console.log(this)
//   }
// }
// // cli.addEventListener('click', obj.b);
// // cli.addEventListener('click', function () {
// //   obj.b()
// // })

// // 'use strict';
// // var button = document.getElementById('click');
// // button.addEventListener('click', function () {
// //   console.log(this); // 在严格模式下，此时的 "this" 指向 undefined
// // });


// obj.b();

// const o = {
//   a() {
//     function b() {
//       console.log(this)
//     }
//     b();
//   }
// }


// o.a()
// var length = 10;
// function fn() {
//   console.log(this.length);
// }

// var obj = {
//   length: 5,
//   method: function (fn) {
//     fn();
//     console.log(arguments)
//     arguments[0]();
//   }
// };

// obj.method(fn, 1);

// var obt = {
//   a: 20,
//   fn: function () {
//     console.log(this);
//   }
// };
// (obt.fn)(); 

// function a(xx) {
//   this.x = xx;
//   return this
// }
// var x = a(5);
// // var y = a(6);

// console.log(x.x)  // undefined
// console.log(y.x)  // 6

function foo(something) {
  this.a = something
}

var obj1 = {
  foo: foo
}

var obj2 = {}

obj1.foo(2);
console.log(obj1.a);

obj1.foo.call(obj2, 3);
console.log(obj2.a);

var bar = new obj1.foo(4)
console.log(bar)
console.log(obj1.a);
console.log(bar.a);

Function.prototype.myBind = function (ctx, ...preArgs) {
  if (ctx instanceof Array) {
    throw new TypeError("ctx must not be Array");
  }

  const newThis = this ?? window;
  //绑定this
  ctx._func = newThis;

  return function (...args) {
    const res = ctx._func(...preArgs, ...args);
    delete ctx._func;
    return res;
  }
}

function c(a, b) {
  console.log(a, b, this);
}
c(2, 4);
const t = { x: 1 }
const cbind = c.myBind(t, 2);
cbind(3);

