const callTransaction = require("./eth-utils/call-geth-transactions");
const extractTransactionInfo = require("./eth-utils/transaction-extractor");

const previousStateDepth = 1;

//TODO is returning false a good choice here?
async function replayTransaction(transactionObject){

    const blockNumber = transactionObject.blockNumber

    const {simulationResult, simulationInfo} = await callTransaction(
        transactionObject,
        blockNumber - previousStateDepth,
        true); // We want to run the transaction from the previous block
    // Should re-execute the transaction in some cases, like timeout errors 5s.

    return {simulationResult, simulationInfo}
}

module.exports = replayTransaction