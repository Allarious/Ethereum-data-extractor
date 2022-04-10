const Web3 = require('web3');
const provider = 'http://localhost:8545';
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);
const eth = web3.eth;

async function callTransactionsViaGeth(transactionData, blockNumber, verbose = false) {
    try {
        if(verbose){
            console.log("Transaction is called------->" + transactionData.hash)
            console.log("Block number--------->" + blockNumber)
        }
        let result = await eth.call(transactionData, blockNumber);
        // This line will be reached if eth.call is not throwing data
        // if eth.call changes in the future and returns something for failed transactions, this code will be wrong.
        if(verbose){
            console.log("Successful!")
        }

        if(debug){
            console.log(result)
        }
        return {simulationResult: true, simulationInfo: result}
    } catch (e){
        // Considering that every error relates to the transaction actually failing after the simulation
        //TODO check and see if there is a difference between the transaction failing onChain or in code
        if(verbose){
            console.log("FAILED!")
            console.log(e.message)
        }
        return {simulationResult: false, simulationInfo: e}
    }
}

module.exports = callTransactionsViaGeth
