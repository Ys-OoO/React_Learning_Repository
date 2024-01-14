// function Person(name, age) {
//   this.name = name;
//   this.age = age;
//   this.sayHello = function () {
//     console.log(this);
//     console.log('Hello I am ' + this.name);
//   }
// }
// Person.prototype.live = true;
// console.log(Person);

// console.log(Person === Person.prototype.constructor); //true
// const person = new Person('ys', 18);
// console.log(person, person.__proto__ === Person.prototype, Person.prototype);

// console.log(person.__proto__.__proto__ === Object.prototype);
// PersonCons.prototype.sayHi = function () {
//   console.log(this);
//   console.log('Hi I am ' + this.name);
// }

// new PersonCons('ys', 18).sayHello();
// console.log("Person Function", new PersonCons('ys', 18));

// class Person {
//   name;
//   age;
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   sayHi() {
//     console.log('Hi I am ' + this.name);
//   }
// }

// class Student extends Person {
//   grade;

//   constructor(name, age, grade) {
//     super(name, age);
//     this.grade = grade;
//   }

//   study() {
//     console.log(this.name + " is study in grade " + this.grade);
//   }
// }

// const me = new Student('ys', 18, 3);
// console.log(Student.prototype, me);
// console.log(Student.prototype.__proto__ === Person.prototype);
// console.log(me.__proto__ === Student.prototype);
// console.log(me.__proto__.__proto__ === Person.prototype)
// console.log(Student.prototype);
// console.dir(Object);
// console.dir(Object.prototype);
// console.dir(Object.__proto__);

// console.dir(Function.prototype);
// console.dir(Function.__proto__);

// console.log(Function.prototype.__proto__ === Object.prototype)
// console.log(Function.prototype === Function.__proto__);
// console.log(Function.__proto__.__proto__ === Object.prototype);
// console.log(Object.__proto__ === Function.prototype);
// console.dir(Object.prototype.__proto__);
// console.dir(Function.prototype.__proto__ === Object.prototype);
// console.log(typeof Function.prototype);
// console.dir(Function.prototype === Function.__proto__);
// console.dir(Function.prototype === Object.__proto__);
// console.dir(Function);


