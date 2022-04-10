const replayBlock = require('./utils/geth/replay-block');
const listenForLatestBlockAndReplay = require('./utils/geth/listen-and-replay')
const runTransaction = require("./test/test-transaction-replay")

debug = false

listenForLatestBlockAndReplay(0, true).then(() => console.log("Process Finished"))

// replayBlock(14187204, true, false, false);

// testTransactionReplay('0xd049e97242f59ce85e2c457ecd56dc662e1a5db189c8753a0a3853b4d2b2db33', 14187817).then(x => console.log(x));