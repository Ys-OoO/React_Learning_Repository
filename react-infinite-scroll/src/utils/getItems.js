export default function getItems() {
  return new Promise((resolve, reject) => {
    const res = [];
    var letters = 'abcdefghijklmnopqrstuvwxyz';
    var randomIndex = Math.floor(Math.random() * letters.length);
    for (let i = 0; i < 10; i++) {
      res.push(i + letters[randomIndex]);
    }
    setTimeout(() => {
      resolve(res);
    }, 1000)
  })
}