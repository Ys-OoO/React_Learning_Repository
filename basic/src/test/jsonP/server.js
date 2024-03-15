import { createServer } from 'http';
import { parse } from 'url';
const server = createServer((request, response) => {
  // //设置过期时间：Expires 10s
  response.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Expires": new Date(Date.now() + 10000).toUTCString()
  })

  let params = parse(request.url, true).query;
  if (params.callback) {
    let callback = params.callback;
    console.log(callback)

    let data = { name: 'ys' }
    response.end(`${callback} ( ${JSON.stringify(data)} )`);
  } else {
    response.end("err")
  }
})

server.listen(9001, () => {
  console.log("开始监听9001端口")
})