let request = require("request-promise")

async function fetchTransaction (hash, verbose = false) {
    let request_link = "https://api.blockcypher.com/v1/eth/main/txs/" + hash
    if(verbose)
        console.log(request_link)
    await request(request_link, (error, response, data) => {
        if (!error && response.statusCode == 200) {
            let tx = JSON.parse(data)
            const from = tx.addresses[1]
            const to = tx.inputs[0]
            console.log(from)
            console.log(to)
            // console.log(tx)
        } else {
            console.log("Error! Could not fetch data from block" + numberOfBlock + "!")
        }
    })
}

module.exports = fetchTransaction