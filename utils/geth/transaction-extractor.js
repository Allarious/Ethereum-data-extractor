var Web3 = require('web3');
var provider = 'http://localhost:8545';
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
var eth = web3.eth;

const previousStateDepth = 1;

async function transactionExtractor(tx_hash) {
    try {
        return await eth.getTransaction(tx_hash);
    } catch (e) {
        console.log("Transaction " + tx_hash + " could not be fetched, there might be a problem with geth")
        return false
    }
}

async function transactionReceiptExtractor(tx_hash) {
    try {
        return await eth.getTransactionReceipt(tx_hash)
    } catch (e) {
        console.log("Transaction receipt " + tx_hash + " could not be fetched, there might be a problem with geth")
        return false
    }
}

async function callTransaction(txObject, blockNumber) {
    try {
        await eth.call(txObject, blockNumber);
        return true
    } catch (e){
        // Considering that every error relates to the transaction actually failing after the simulation
        //TODO check and see if there is a difference between the transaction failing onChain or in code
        return false
    }
}

//TODO is returning false a good choice here?
async function reportTransactionReplay(txHash, onlyIfFailed, includeAllFailed){
    const transactionReceipt = await transactionReceiptExtractor(txHash);

    if(!transactionReceipt) {
        return false
    }

    if(onlyIfFailed && transactionReceipt.status){
        return false
    }

    const transactionObject = await transactionExtractor(txHash);

    if(!transactionObject){
        return false
    }

    const blockNumber = transactionObject.blockNumber

    const simulationResult = await callTransaction(transactionObject, blockNumber - previousStateDepth); // We want to run the transaction from the previous block
    //if a transaction was failed or ran at the start
    if (simulationResult !== transactionReceipt.status || (!transactionReceipt.status && includeAllFailed)){
        return {chainReceipt: transactionReceipt.status, simulatedRun: simulationResult, transactionHash: transactionObject.hash, blockNumber: blockNumber, transactionIndex: transactionObject.transactionIndex}
    }
    return false
}

module.exports = reportTransactionReplay;