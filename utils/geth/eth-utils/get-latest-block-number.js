const Web3 = require('web3');
const provider = 'http://localhost:8545';
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);
const eth = web3.eth;

async function getBlockNumber(){
    try{
        let blockNumber = await eth.getBlockNumber();
        return blockNumber
    } catch (e) {
        console.log("An error happened with getting the latest block number. Check and see if geth server is up and running on " + provider)
    }
}

module.exports = getBlockNumber;