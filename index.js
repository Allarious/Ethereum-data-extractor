const Web3 = require('web3');
const provider = 'http://localhost:8545';
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);
const eth = web3.eth;
const replayBlock = require('./utils/geth/replay-block');
const axios = require('axios')


// eth.getBlockNumber().then((result) => {
//     console.log("Latest Ethereum Block is ",result);
// });

// replayBlock(14176087, true);

// fetchBlock(14176078).then(item => console.log(item))

// replayRecentBlocks(14180993, true, false, false)

const delay = ms => new Promise(res => setTimeout(res, ms));

async function listenForLastBlockAndReplay(){
    let blockNumber = 0;
    let previousBlockNumber = 0;
    while(true){
         console.log("Looking for a new block...")
         blockNumber = await eth.getBlockNumber();
         blockNumber = blockNumber - 30; //To make sure the block is confirmed
         console.log("Latest block number is " + blockNumber)
         if(blockNumber === previousBlockNumber){
             console.log("Block has been processed before!")
             // Can add sleep?
             console.log("Sleeping for 10 seconds.");
             await delay(10000);
             console.log("sleeping is over!")
             continue;
         }
         console.log("fetching block data:")
         blockData = await eth.getBlock(blockNumber)

        axios.post('http://localhost:3000/blocks', JSON.stringify(blockData));

         console.log(blockData)
         console.log("Replaying Block " + blockNumber)
         let transactions = await replayBlock(blockNumber, true, true, true);
         console.log("Result of replaying:")
         console.log(transactions)

         for (const tx of transactions) {
             console.log("sending transaction to db:")
             console.log(tx)
             axios.post('http://localhost:3000/transactions', JSON.stringify(tx));
         }

         previousBlockNumber = blockNumber;
    }
}

listenForLastBlockAndReplay()

//A function that loops and runs after every run
// if the block number is the same, it will sleep for 10 seconds and retries
// Goes through a block, the recent one
// Sends the block data to a json server
// Runs the transactions and sends the interesting ones to a json-server



// eth.getTransaction("0x4d32b9c58d7affa5f3164fa389afdc523f32852d99dc65f90b9853afe88083e6").then(tx => eth.call(tx,
//     14175987).then(ans => console.log(ans)))

// async function lookInBlocks(blockNumber){
//
//     for(let i = 0; i<10; i++) {
//         let result = []
//         result = await replayBlock(blockNumber+i)
//         // console.log(result)
//     }
//
// }
//
// lookInBlocks(14175905)

// replayBlock(14175628)

// replayTransactions("0x2eeccf33fd731d95a6a74bf47286612587c2c3d7a01553e1843c4ec19d5fc1c6").then(result => console.log(result))
// replayTransactions("0x6dfb784f9ed2a7f11a8c7c07f4eb1218945b7add70270f66f8ce5045b0db3216")
// console.log(eth)

// replayTransactions("0xee3b25c3dcada84f91922dfd7f3273337feeca6fba60fd9ac8e11862b03fe413").then(result => console.log(result));


// eth.getRawTransaction("0xe94108ddd1d61d2908a25dc8d08f1ee010365a8dd7a2e108a70640e40c216fa8").then((result) => console.log(result))