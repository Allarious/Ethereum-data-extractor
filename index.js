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

listenForLatestBlockAndReplay(1, true)


// testTransactionReplay('0x13e0fcc93d2a865e6a8dafab6f98323c9ad74a17ef48d3f878e29571e50ae105', 14182521).then(x => console.log(x));