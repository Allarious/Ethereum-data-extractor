const Web3 = require('web3');
const provider = 'http://localhost:8545';
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);
const eth = web3.eth;

async function testTransactionReplay(transactionHash, blockNumber){
    let transactionData;
    try{
        transactionData = await eth.getTransaction(transactionHash)
        console.log(transactionData)
    } catch (e) {
        console.log("ERROR: could not fetch transaction! transaction hash: " + transactionHash)
        console.log(e)
        return false
    }

    if(!transactionData){
        console.log("Failed, aborting...")
        return false
    }

    try{
        let transactionResult = await eth.call(transactionData, blockNumber)
        console.log(transactionResult)
    } catch (e) {
        console.log(e)
    }
}

module.exports = testTransactionReplay