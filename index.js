const Web3 = require('web3');
const provider = 'http://localhost:8545';
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);
const eth = web3.eth;
const replayBlock = require('./utils/geth/replay-block');
const axios = require('axios')
const delay = require('./utils/general/delay')
const serverAddress = 'http://localhost:3000'
const listenForLatestBlockAndReplay = require('./utils/geth/listen-and-replay')
const testTransactionReplay = require('./test/test-transaction-replay')

listenForLatestBlockAndReplay(2, true)

// replayBlock(14187204, true, false, false);


//interesting blocks
//14187159

// testTransactionReplay('0xd049e97242f59ce85e2c457ecd56dc662e1a5db189c8753a0a3853b4d2b2db33', 14187817).then(x => console.log(x));