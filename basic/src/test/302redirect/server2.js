import { createServer } from 'http'

const server = createServer((request, response) => {
  response.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
  })
  response.end("Hello this is index2.html")
})

server.listen(9001, () => {
  console.log("开始监听9001端口")
})