var Web3 = require('web3');
var provider = 'http://localhost:8545';
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
var eth = web3.eth;

async function fetchBlock(blockNumber, verbose = false){
    try{
        let blockData = await eth.getBlock(blockNumber);
        return blockData;
    }catch (e) {
        console.log("Could not retrieve data from block " + blockNumber + ". Try a block with lower depth.");
        return false;
    }
}

module.exports = fetchBlock;