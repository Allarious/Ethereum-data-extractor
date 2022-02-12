var Web3 = require('web3');
var provider = 'http://localhost:8545';
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
var eth = web3.eth;

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

module.exports = { transactionExtractor, transactionReceiptExtractor };