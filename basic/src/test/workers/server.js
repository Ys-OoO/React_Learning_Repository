import fs from 'fs';
import { createServer } from 'http';
import path from 'path';
const server = createServer((request, response) => {
  // 设置响应头
  response.writeHead(200, { 'Content-Type': 'text/javascript' });

  // 读取 JavaScript 文件
  const filePath = path.join('./imp.js'); // 替换为你的 JavaScript 文件路径
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      response.writeHead(500);
      response.end('Internal Server Error');
    } else {
      // 返回文件内容
      response.end(data);
    }
  });
})

server.listen(9001, () => {
  console.log("开始监听9001端口")
})