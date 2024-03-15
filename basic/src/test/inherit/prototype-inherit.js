function Shape(name) {
  this.name = name;
  this.getName = function () {
    return this.name;
  }
}

// Object.defineProperty(Shape.prototype, "getName", {
//   value: function () {
//     return this.name;
//   },
//   writable: false,
// })


//---------原型链继承
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

// 原型链继承需要指定 子类的原型 是 父类的实例
Rectangle.prototype = new Shape('Rectangle')
// 修复构造函数
Rectangle.prototype.constructor = Rectangle;
// 额外方法必须写后面
Rectangle.prototype.getArea = function () {
  return this.width * this.height;
}

const rect1 = new Rectangle(1, 2);
const rect2 = new Rectangle(1, 3);

rect1.__proto__.getName = () => "xxx"
console.log(rect1, rect2)