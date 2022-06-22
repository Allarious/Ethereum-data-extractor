# Ethereum Data Extractor
------
This project in supposed to be run beside a geth client on localhost:8545, and a json-server on port 3000.
It extracts **some** of the recent blocks and re-runs their transactions on the previous finalized state. This way we can find which transactions failed because of the previous transactions in its block. We categorize these transactions into rational and irrational ones.
After the data is stored as a json file, it can be used and parsed into various formats using the existing platforms.
