# http-files-push

> http-files-push makes file uploads a breeze.


更方便的把前端打包好的代码传到服务端开发机上进行联调。

## Installation
```
npm install --save http-files-push
```

## Usage

```
// const httpPush = require('http-files-push');

httpPush({
        api: deployServer.receiver, // 要上传的服务器地址
        remote: deployServer.path // 服务器上的文件放置路径
    }).upload('/dist'); //本地要上传的文件路径

```

## example

```
/**
 服务器的地址： fuqqnl.example.com:8080
 服务器放置文件路径: /home/work/exdir/

 本地产出文件路径: /dist
 dist文件的内容为：
 |--dist
 |   --- template
 |   --- webroot

*/

httpPush({
        api:  fuqqnl.example.com:8080,
        remote: /home/work/exdir/
    }).upload('/dist');

/*
最终文件会上传到: fuqqnl.example.com:8080/home/work/exdir/template 和
fuqqnl.example.com/8080/home/work/exdir/webroot下。
*/

```

## 测试例子

```
npm run deploy

```
