const fetchBlock = require("../etherscan/extract-etherscan-block");
const replayTransactions = require("./transaction-extractor");

async function replayBlock(blockNumber, verbose = false,onlyIfFailed = false, includeAllFailed = false){
    blockData = await fetchBlock(blockNumber, false)
    results = []
    index = 0
    for (const tx of blockData) {
        index += 1;
        if(index == 40){
            break;
        }
        // let output = await replayTransactions(tx)
        let output = await replayTransactions(tx, onlyIfFailed, includeAllFailed)
        if(output){
            results.push(output)
            if(verbose)
                console.log(output)
        }
        if(verbose)
            console.log(index)
    }
    return results
}

async function replayRecentBlocks(blockNumber, verbose, onlyIfFailed, includeAllFailed) {
    // For fast mode, onlyIfFailed: true, includeAllFailed: false
    for(let i = 0; i<10; i++){
        await replayBlock(blockNumber + i, verbose, onlyIfFailed, includeAllFailed);
    }
}

module.exports = replayBlock