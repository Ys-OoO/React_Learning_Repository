import { createServer } from 'http';

const server = createServer((request, response) => {
  // //设置过期时间：Expires 10s
  response.writeHead(200, {
    // "Access-Control-Allow-Origin": "*",
    "Expires": new Date(Date.now() + 10000).toUTCString()
  })
  response.end("Hello")

  // //设置协商缓存过期时间：Last-Modified 30s
  // let curTime = new Date().getTime();
  // // 若服务端设置了Last-Modified，则浏览器以后发送该请求时，会携带当前请求的时间。
  // let lastModify = request.headers["if-modified-since"];
  // let lastModifiedTime = new Date(lastModify).getTime();
  // // Last-Modify存在 且命中缓存，返回304，浏览器取缓存内容
  // if (curTime <= lastModifiedTime) {
  //   console.log('命中缓存');
  //   response.writeHead(304, {
  //     'Access-Control-Allow-Origin': '*',
  //     "Last-Modified": new Date(lastModify).toUTCString(),
  //   });
  //   response.end();
  // } else {//否则设置新协商缓存，并响应
  //   //设置10s协商缓存
  //   response.writeHead(200, {
  //     "Access-Control-Allow-Origin": "*",
  //     "Last-Modified": new Date(Date.now() + 10000).toUTCString(),
  //   })
  //   response.end("Hello");
  // }

  // //强缓存Cache-Control 10s
  // response.writeHead(200, {
  //   "Access-Control-Allow-Origin": "*",
  //   'cache-control': 'max-age=10000'
  // })
  // response.end("Hello")

  // //协商和缓存
  // // 获取客户端提供的 If-None-Match 头
  // const ifNoneMatch = request.headers['if-none-match'];

  // let etag = '1.1.1';
  // // 检查客户端提供的 ETag 与服务器生成的 ETag 是否匹配
  // if (ifNoneMatch === etag) {
  //   console.log("缓存命中")
  //   // 如果匹配，则返回 304 Not Modified
  //   response.writeHead(304, {
  //     'Access-Control-Allow-Origin': '*',
  //     'cache-control': 'public, no-cache',
  //     'etag': etag
  //   });
  //   response.end();
  // } else {
  //   // 如果不匹配，则返回新的资源内容和 ETag
  //   response.writeHead(200, {
  //     'Access-Control-Allow-Origin': '*',
  //     'cache-control': 'public, no-cache',
  //     'etag': etag
  //   });
  //   response.end("Hello");
  // }

})

server.listen(9001, () => {
  console.log("开始监听9001端口")
})