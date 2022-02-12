const callTransaction = require("./eth-utils/call-geth-transactions");
const extractTransactionInfo = require("./eth-utils/transaction-extractor");

const previousStateDepth = 1;

//TODO is returning false a good choice here?
async function replayTransaction(transactionHash, onlyIfFailed, includeAllFailed){

    const { transactionObject, transactionReceipt } = await extractTransactionInfo(transactionHash);

    if(!handleIfTransactionShouldReplay(transactionObject, transactionReceipt, onlyIfFailed)){
        return false
    }

    const blockNumber = transactionObject.blockNumber

    const simulationResult = await callTransaction(transactionObject, blockNumber - previousStateDepth); // We want to run the transaction from the previous block

    //if a transaction was failed or ran at the start
    if (simulationResult !== transactionReceipt.status || (!transactionReceipt.status && includeAllFailed)){
        // return {chainReceipt: transactionReceipt.status, simulatedRun: simulationResult, transactionHash: transactionObject.hash, blockNumber: blockNumber, transactionIndex: transactionObject.transactionIndex}
        return {chainReceipt: transactionReceipt.status, simulatedRun: simulationResult, transactionReceipt: transactionReceipt, transactionObject: transactionObject}
    }
    return false
}

async function handleIfTransactionShouldReplay(transactionObject, transactionReceipt, onlyIfFailed){

    if(transactionObject === null || transactionReceipt === null){
        if(transactionObject === null || transactionReceipt !== null){
            console.log("Transaction receipt could not be fetched, skipping this transaction.")
        }
        if(transactionObject !== null || transactionReceipt === null){
            console.log("Transaction object could not be fetched, skipping this transaction.")
        }
        if(transactionObject === null && transactionReceipt === null){
            console.log("Transaction object and transaction receipt could not be fetched, skipping this transaction.")
        }
        return false
    }

    const transactionChainStatus = transactionReceipt.status;
    if(onlyIfFailed && transactionChainStatus){
        return false
    }

    return true
}

module.exports = replayTransaction