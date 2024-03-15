import { createServer } from 'http';
const server = createServer((request, response) => {

  console.log(request.headers.origin);
  response.writeHead(200, {
    "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
    'access-control-expose-headers': "api-key",
    "api-key": 'xxx'
  })
  response.end('1')
})

server.listen(9001, () => {
  console.log("开始监听9001端口")
})