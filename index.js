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

// replayBlock(14182666, true, false, false);


// testTransactionReplay('0x28add291ce43bbe0982479fae0cb72e4a75af6ff142bc58f271c70c10581b4c0', 14182644).then(x => console.log(x));