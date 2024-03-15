const dedicated = document.getElementById('dedicated')
dedicated.addEventListener('click', () => {
  const dedicatedWorker = new Worker('http://127.0.0.1:9001');
  console.log(dedicatedWorker)
  dedicatedWorker.postMessage('1');
  dedicatedWorker.onmessage = (e) => {
    console.log(e)
  }
})


const shared = document.getElementById('shared')
shared.addEventListener('click', () => {
  const sharedWorker = new SharedWorker('./sharedWorker.js');
  sharedWorker.port.onmessage = (e) => {
    console.log(e)
  }
})
