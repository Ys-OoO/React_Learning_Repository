function Shape(name) {
  this.name = name;
  this.getName = function () {
    return this.name;
  }
}


function Triangle(edge, height) {
  this.edge = edge;
  this.height = height;
  //构造函数继承
  Shape.call(this, "Triangle");
}

//原型链继承
Triangle.prototype = new Shape("Triangle");
//修复构造函数
Triangle.prototype.constructor = Triangle;

Triangle.prototype.getArea = function () {
  return this.edge * this.height / 2;
}
//----------------test
const triangle1 = new Triangle(3, 4);

console.log(triangle1)