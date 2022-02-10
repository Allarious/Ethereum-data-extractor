const Web3 = require('web3');
const provider = 'http://localhost:8545';
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);
const eth = web3.eth;
const replayBlock = require('./utils/geth/replay-block');


eth.getBlockNumber().then((result) => {
    console.log("Latest Ethereum Block is ",result);
});

replayBlock(14176087, true);

// fetchBlock(14176078).then(item => console.log(item))


// fetchBlock(14175311, false).then((data => {
//     data.forEach(tx => {
//         console.log(tx)
//         replayTransactions(tx).then(result => console.log(result))
//     })
// }))

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