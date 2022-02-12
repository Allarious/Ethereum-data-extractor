const Web3 = require('web3');
const provider = 'http://localhost:8545';
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);
const eth = web3.eth;

async function callTransactionsViaGeth(transactionData, blockNumber) {
    try {
        console.log("Transaction is called------->" + transactionData.hash)
        console.log("Block number--------->" + blockNumber)
        await eth.call(transactionData, blockNumber);
        // This line will be reached if eth.call is not throwing data
        // if eth.call changes in the future and returns something for failed transactions, this code will be wrong.
        console.log("Successful!")
        return true
    } catch (e){
        // Considering that every error relates to the transaction actually failing after the simulation
        //TODO check and see if there is a difference between the transaction failing onChain or in code
        console.log("Failed!")
        return false
    }
}

module.exports = callTransactionsViaGeth
