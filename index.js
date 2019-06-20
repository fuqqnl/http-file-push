/**
* @file 本地打包好的数据推送到服务器上
* @author fuqqnl
*/

const fs = require('fs');
const path = require('path');
const request = require('request');

class FilePush {
    constructor({api, local, remote}) {
        this._api = api;
        this._local = null;
        this._remote = remote;
        this._uploadnum = 0;
    }

    /**
    * 上传操作，可上传文件或者目录
    * @param {string} dir
    */
    upload(dir) {
        this._local = dir;
        const prefix = process.cwd();
        let dirname = prefix;
        if (dir && dir.substr(1) !== '/') {
            dirname = path.join(dirname, dir);
        }
        this._upload(dirname);
    }

    /**
    * 如果存在，并且是dir，则进行递归变量，最后发送每一个文件
    * @param {string} dir 目录路径
    */
    _upload(dir) {
        if (fs.existsSync(dir)) {
            const stats = fs.statSync(dir);
            if (stats.isDirectory()) {
                fs.readdir(dir, (err, items) => {
                    for (let i = 0; i < items.length; i++) {
                        this._upload(`${dir}/${items[i]}`);
                    }
                });
            } else if (stats.size > 0) {
                this.sendFile(dir);
            } else {
                console.warn(`upload file named ${dir} is empty`);
            }
        }
    }

    /**
    * 通过path，跟rote的位置，结合成完整的路径
    */
    getRemotePath(filePath) {
        filePath = filePath.substr(filePath.indexOf(this._local) + this._local.length + 1);
        let to = `${this._remote}/${filePath}`;
        return to;
    }

    getLocalPath(file) {
        return path.resolve(file);
    }

    /**
    *   把文件发送让出去
    */
    sendFile(filePath) {
        const remotePath = this.getRemotePath(filePath);
        const localPath = this.getLocalPath(filePath);
        const formData = {
            to: remotePath,
            file: fs.createReadStream(localPath)
        };
        request.post({
            url: this._api,
            formData
        }, (err, httpResponse, body) => {
            if (err) {
                return console.error(`${filePath} upload failed:\n`, err);
            }
            this._uploadnum++;
            console.log(`file ${this._uploadnum}: ${filePath} => ${remotePath}`);
        });
    }
}

module.exports = config => {
    return new FilePush(config);
};
