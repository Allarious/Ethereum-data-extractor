const Web3 = require('web3');
const provider = 'http://localhost:8545';
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);
const eth = web3.eth;

async function callGethTransaction(txObject, blockNumber) {
    try {
        console.log("Transaction is called------->" + txObject.hash)
        console.log("Block number--------->" + blockNumber)
        await eth.call(txObject, blockNumber);
        console.log("Successful!")
        return true
    } catch (e){
        console.log("Failed!")
        return false
    }
}

module.exports = callGethTransaction
