const Web3 = require('web3');
const provider = 'http://localhost:8545';
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);
const eth = web3.eth;
// const callTransaction = require('../utils/geth/call-geth-transactions')

async function testTransactionReplay(transactionHash, blockNumber){
    try{
        transactionData = await eth.getTransaction(transactionHash)
        console.log(transactionData)
    } catch (e) {
        console.log("ERROR: could not fetch transaction! transaction hash: " + transactionHash)
        console.log(e)
        return false
    }

    await callTransaction(transactionData, blockNumber)
}

module.exports = testTransactionReplay