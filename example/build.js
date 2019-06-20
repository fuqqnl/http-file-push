/**
* @file 测试文件的上传
*/

const httpPush = require('../index');
// 地址是模拟的，但是可以从中熟悉用法
const receiver = 'fuqqnl.example.com:8080';
const path = '/home/work/exdir';

if (process.argv[2] === 'deploy') {
    console.log(`\x1b[31m push to server... \x1b[0m`);
    httpPush({
        api: receiver,
        remote: path
    }).upload('/dist');
} else {
    console.log('请执行 npm run deploy');
}
