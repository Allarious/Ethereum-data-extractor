let request = require("request-promise")
let cheerio = require("cheerio")

function extractTransactions(html) {
    const $ = cheerio.load(html)
    let transactions = $(".myFnExpandBox_searchVal")
    let txList = []
    for(let i = 0; i < transactions.length; i++){
        //TODO: This only works with links and throws error for others. (e.g. does not work with Genesis block)
        let txLink = transactions[i].attribs.href
        txList.push(txLink.substr(4))
    }
    return txList;
}

async function fetchBlock (numberOfBlock, verbose = false){
    let page = 0;
    let txFullList = []
    while (page < 200) {
        ++page
        let request_link = "https://etherscan.io/txs?block=" + numberOfBlock + "&p=" + page
        if(verbose)
            console.log(request_link)
        let txListPage
        await request(request_link, (error, response, html) => {
            if (!error && response.statusCode == 200) {
                txListPage = extractTransactions(html)
            } else {
                console.log("Error! Could not fetch data from block" + numberOfBlock + "!")
            }
        })
        txListPage.forEach((item) => txFullList.push(item))
        if( txListPage.length < 50){
            break
        }
    }
    return txFullList
}

module.exports = fetchBlock