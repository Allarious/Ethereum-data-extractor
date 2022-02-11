const Web3 = require('web3');
const provider = 'http://localhost:8545';
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);
const eth = web3.eth;

async function testTransactionReplay(transactionHash, blockNumber){
    try{
        transactionData = await eth.getTransaction(transactionHash)
    } catch (e) {
        console.log("ERROR: could not fetch transaction! transaction hash: " + transactionHash)
        console.log(e)
        return false
    }

    try{
        transactionRunOutput = await eth.call(transactionData, blockNumber);
        return true
    } catch(e){
        console.log("FAIL: transaction run failed.")
        console.log(e)
        return false
    }
}

module.exports = testTransactionReplay