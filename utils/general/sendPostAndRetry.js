const axios = require("axios");
const delay = require("./delay")

async function sendPostAndRetry(address, data){
    try {
        await axios.post(address, JSON.stringify(data));
    } catch (e) {
        console.log("Server seems to be down, retrying in 10 seconds...")
        await delay(10000)
        await axios.post(address, JSON.stringify(data));
    }
}

module.exports = sendPostAndRetry