import { createServer } from 'http'

const server = createServer((request, response) => {
  response.writeHead(302, {
    "Access-Control-Allow-Origin": "*",
    'location': 'http://127.0.0.1:9001/'
  })
  response.end()

})
server.listen(9000, () => {
  console.log("开始监听9000端口")
})
