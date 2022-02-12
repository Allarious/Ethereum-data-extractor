const callTransaction = require("./eth-utils/call-geth-transactions");
const { transactionExtractor, transactionReceiptExtractor } = require("./eth-utils/transaction-extractor");

const previousStateDepth = 1;

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

    //if a transaction was failed or ran at the start
    if (simulationResult !== transactionReceipt.status || (!transactionReceipt.status && includeAllFailed)){
        // return {chainReceipt: transactionReceipt.status, simulatedRun: simulationResult, transactionHash: transactionObject.hash, blockNumber: blockNumber, transactionIndex: transactionObject.transactionIndex}
        return {chainReceipt: transactionReceipt.status, simulatedRun: simulationResult, transactionReceipt: transactionReceipt, transactionObject: transactionObject}
    }
    return false
}

module.exports = replayTransaction