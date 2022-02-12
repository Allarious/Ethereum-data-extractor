const fetchBlock = require("../etherscan/extract-etherscan-block");
const replayTransaction = require("./replay-transaction");
const {transactionExtractor, transactionReceiptExtractor} = require("./eth-utils/transaction-extractor");

async function replayBlock(blockNumber, verbose = false, onlyIfFailed = false, includeAllFailed = false){

    let arrayOfBlocksTransactions = await fetchBlock(blockNumber, verbose)
    let replayResults = []
    let transactionLoopIndex = 0

    if(debug)
        console.log(arrayOfBlocksTransactions)

    for (const transactionHash of arrayOfBlocksTransactions) {
        transactionLoopIndex += 1;

        if(verbose)
            console.log(transactionLoopIndex)

        const { transactionReceipt, transactionObject } = await extractTransactionInfoIfNeeded(transactionHash, onlyIfFailed); // Handles if transaction can be replayed and then extracts all the info

        if(transactionObject === null){
            continue;
        }

        let {simulationResult, simulationInfo} = await replayTransaction(transactionObject)

        if(!(await handleIfTransactionShouldReport(
            transactionReceipt,
            simulationResult,
            includeAllFailed))){
            continue;
        }

        let reportResult = {
            "Simulation Result": simulationResult,
            "On-chain Status": transactionReceipt.status,
            transactionReceipt,
            transactionObject }

        replayResults.push()

        if(verbose)
            console.log(reportResult)
    }

    return replayResults
}

async function extractTransactionInfoIfNeeded(transactionHash, onlyIfFailed){

    let transactionReceipt = await transactionReceiptExtractor(transactionHash);
    let transactionObject = null;

    if(!transactionReceipt) {
        return {transactionReceipt: null, transactionObject: null}
    }

    if(!(await handleIfTransactionShouldReplay(transactionReceipt, onlyIfFailed))){
        return {transactionReceipt: transactionReceipt, transactionObject: null}
    }

    transactionObject = await transactionExtractor(transactionHash);

    if(!transactionObject){
        return {transactionReceipt, transactionObject: null}
    }

    return { transactionReceipt, transactionObject }
}

async function handleIfTransactionShouldReplay(transactionReceipt, onlyIfFailed){

    if(transactionReceipt === null){
        console.log("Transaction receipt could not be fetched, skipping this transaction.")
        //Report failures later
        return false
    }

    const transactionChainStatus = transactionReceipt.status;
    if(onlyIfFailed && transactionChainStatus){
        return false
    }

    return true
}


async function handleIfTransactionShouldReport(transactionReceipt, simulationResult, includeAllFailed){
    if (simulationResult !== transactionReceipt.status || (!transactionReceipt.status && includeAllFailed)){
        return true
    }
    return false
}

module.exports = replayBlock