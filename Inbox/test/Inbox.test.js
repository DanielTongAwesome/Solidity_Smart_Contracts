/*
 * @Author: Daniel Tong
 * @Date: 2020-02-06 20:12:59
 * @LastEditTime : 2020-02-07 19:05:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Smart_Contract/Inbox/test/Inbox.test.js
 */
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

// UPDATE THESE TWO LINES RIGHT HERE!!!!! <-----------------
const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');



let accounts;
let inbox;

beforeEach( async () => {
    // get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // use one of those accounts to deploy
    // the contract
    inbox =  await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hello World !']}) 
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    // test 1
    it('deploys a contract', () => {
        //console.log(inbox);
        assert.ok(inbox.options.address);
    });
    // test 2
    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hello World !');
    });
    // test 3
    it('can change the message', async () => {
        await inbox.methods.setMessage('Hello from the other side').send({ from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hello from the other side');
    });
});





// class Car {
//     park(){
//         return 'stopped';
//     }

//     drive(){
//         return 'vroom';
//     }
// }

// let car;
// beforeEach(() => {
//     car  = new Car();
// })

// describe('Car', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     });
// });





