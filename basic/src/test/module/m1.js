// //命名导出
// export const user = 'ys';
// let age = 24;
// export { age };

// //默认导出
// export default function getInfo() {
//   console.log(`${user} is ${age} years old`)
// }

// import { user } from './user.js';

// user.name = "modify to YS";

async function imp() {
  const module = await import('./user.js');
  console.log(module); //包含所有导出的对象
  console.log(
    module.user.name,//命名导出的
    module.default?.()//默认导出的
  )
}

imp();

console.log(import.meta)