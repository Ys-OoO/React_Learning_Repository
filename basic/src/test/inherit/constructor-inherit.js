function Shape(name) {
  this.name = name;
  this.getName = function () {
    return this.name;
  }
}


//---------原型链继承
function Circle(radius) {
  this.radius = radius;
  //实现继承的关键，调用父类的构造函数，将父类this相关属性挂在到子类实力上
  Shape.call(this, "Circle");
}

Circle.prototype.getArea = function () {
  return this.radius * this.radius * 3.14;
}


const circle1 = new Circle(2);
const circle2 = new Circle(2);

circle1.getName = () => "xxx";
console.log(circle1, circle2.getName())