function Shape(name) {
  this.name = name;
  this.getName = function () {
    return this.name;
  }
}

function Pentagon(edge) {
  this.edge = edge;
  //构造函数继承
  Shape.call(this, "Pentagon");
}

//仅把Shape的原型拿来，而不是重新创建一个实例
Pentagon.prototype = Object.create(Shape.prototype);

//修复构造函数
Pentagon.prototype.constructor = Pentagon;

Pentagon.prototype.getArea = function () {
  const height = this.edge / (2 * Math.tan(Math.PI / 5));

  const area = 5 * 0.5 * this.edge * height;

  return area;
}

const pentagon = new Pentagon(5);
console.log(pentagon);