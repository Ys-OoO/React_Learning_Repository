console.log(self, location.href)

self.onmessage = (message) => {
  console.log(message);
}

self.postMessage('2')

self.importScripts('http://127.0.0.1:9001')