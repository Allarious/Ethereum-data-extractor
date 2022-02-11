const replayBlock = require("./replay-block");
const axios = require("axios");
const delay = require("../general/delay");

const Web3 = require('web3');
const provider = 'http://localhost:8545';
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);
const eth = web3.eth;
const serverAddress = 'http://localhost:3000'

//TODO: Mode can be better
async function listenForLatestBlockAndReplay(mode = 2, verbose = false){

    let blockNumber = 0;
    let previousBlockNumber = 0;

    loop: while(true){
        if(verbose)
            console.log("Looking for a new block...")

        blockNumber = await eth.getBlockNumber(); //Get the latest block's number from geth
        blockNumber = blockNumber - 30; //To make sure the block is confirmed

        if(verbose)
            console.log("Latest block number is (after subtracting the amount) " + blockNumber)

        if(blockNumber === previousBlockNumber){
            await handleBlockRepetition(true);
            continue loop;
        }

        if(verbose)
            console.log("fetching block " + blockNumber + "'s data.")
        blockData = await eth.getBlock(blockNumber)

        if(verbose)
            console.log("Replaying Block " + blockNumber)

        let {onlyIfFailed, includeAllFailed} = handleMode(mode)

        let transactions = await replayBlock(blockNumber, verbose, onlyIfFailed, includeAllFailed);

        if(verbose) {
            console.log("Result of replaying:")
            console.log(transactions)
        }

        await postDataToServer(blockData, transactions)

        previousBlockNumber = blockNumber;
    }
}

async function postDataToServer(blockData, transactions, verbose = false){
    if(verbose) {
        console.log('sending block to db:')
        console.log(blockData)
    }
    axios.post(serverAddress + '/blocks', JSON.stringify(blockData));
    for (const transaction of transactions) {
        if(verbose) {
            console.log("sending transaction to db:")
            console.log(transaction)
        }
        axios.post(serverAddress + '/transactions', JSON.stringify(transaction));
    }
}

async function handleBlockRepetition(verbose = false){
    if(verbose) {
        console.log("Block has been processed before!")
        console.log("Sleeping for 10 seconds.");
    }
    await delay(10000);
    if(verbose)
        console.log("sleeping is over!")
}

async function handleMode(mode) {
    let onlyIfFailed;
    let includeAllFailed;
    // onlyIfFailed: true, includeAllFailed: false -> 0 fastest
    // onlyIfFailed: true, includeAllFailed: true -> 1 second fastest
    // onlyIfFailed: false, includeAllFailed: false -> 2 third fastest, default most convenient!
    // onlyIfFailed: false, includeAllFailed: true -> 3 slowest
    //Not great to have a switch statement!
    switch(mode) {
        case 0:
            onlyIfFailed = true;
            includeAllFailed = false;
            break;
        case 1:
            onlyIfFailed = true;
            includeAllFailed = true;
            break;
        case 2:
            onlyIfFailed = false;
            includeAllFailed = false;
            break;
        case 3:
            onlyIfFailed = false;
            includeAllFailed = true;
            break;
        default:
            onlyIfFailed = false;
            includeAllFailed = false;
    }

    return {
        onlyIfFailed,
        includeAllFailed
    }
}

module.exports = listenForLatestBlockAndReplay