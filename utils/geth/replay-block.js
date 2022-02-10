const fetchBlock = require("../etherscan/extract-etherscan-block");
const replayTransactions = require("./transaction-extractor");

async function replayBlock(blockNumber, verbose = false,onlyIfFailed = false, includeAllFailed = false){
    blockData = await fetchBlock(blockNumber, false)
    results = []
    index = 0
    for (const tx of blockData) {
        index += 1;
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

module.exports = replayBlock