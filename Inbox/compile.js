/*
 * @Author: Daniel Tong
 * @Date: 2020-02-06 18:18:27
 * @LastEditTime : 2020-02-06 22:36:50
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Smart_Contract/compile.js
 */
const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox'];
