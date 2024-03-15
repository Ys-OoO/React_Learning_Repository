import json from './data.json';
import './index1.scss';
import { dateParse } from './utils/dateParse';

if (module.hot) {
  module.hot.accept();
}

console.log(dateParse(new Date(), "yyyy.MM.dd"))
// console.log(env)
async function func() {
  return 1;
}
func();
new Promise((resolve) => {
  setTimeout(resolve, 100);
}).then(() => {
  console.log(1123)
})
console.log(json)