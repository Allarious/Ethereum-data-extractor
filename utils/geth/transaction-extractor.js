var Web3 = require('web3');
var provider = 'http://localhost:8545';
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
var eth = web3.eth;
const callGethTransaction = require('../geth/call-geth-transactions')

const previousStateDepth = 1;
debug = true

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
        console.log("Transaction is called------->" + txObject.hash)
        console.log("Block number--------->" + blockNumber)
        await eth.call(txObject, blockNumber);
        console.log("Successful!")
        return true
    } catch (e){
        // Considering that every error relates to the transaction actually failing after the simulation
        //TODO check and see if there is a difference between the transaction failing onChain or in code
        console.log("Failed!")
        return false
    }
}

//TODO is returning false a good choice here?
async function replayTransaction(txHash, onlyIfFailed, includeAllFailed){
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
    //*******

    // const simulationResult = await callGethTransaction(transactionObject, blockNumber - previousStateDepth)

    //if a transaction was failed or ran at the start
    if (simulationResult !== transactionReceipt.status || (!transactionReceipt.status && includeAllFailed)){
        // return {chainReceipt: transactionReceipt.status, simulatedRun: simulationResult, transactionHash: transactionObject.hash, blockNumber: blockNumber, transactionIndex: transactionObject.transactionIndex}
        return {chainReceipt: transactionReceipt.status, simulatedRun: simulationResult, transactionReceipt: transactionReceipt, transactionObject: transactionObject}
    }
    return false
}

module.exports = replayTransaction;