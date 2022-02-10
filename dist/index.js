"use strict";

var Web3 = require('web3');

var provider = 'http://localhost:8545';
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
var eth = web3.eth;

let request = require("request-promise");

let cheerio = require("cheerio");

let fetchBlock = require("./utils/extract_etherscan_block");

eth.getBlockNumber().then(result => {
  console.log("Latest Ethereum Block is ", result);
});
fetchBlock(14150150).then(data => console.log(data));