# Ethereum Data Extractor
------
This project in supposed to be run beside a geth running on port 8545 of localhost, and a json-server on port 3000.
It extracts **some** of the recent blocks and re-runs their transactions on the previous block's state. This way it can find which transactions were supposed to run before the block happened. We categorize these transactions into rational and irrational ones.
After the data is stored as a json file, it can be used and parsed into various format using the existing platforms.