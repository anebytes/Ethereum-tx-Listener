
# Ethereum-tx-Listener

Listen to all transactions on the ethereum network.

- Clone Repo and run `yarn`

- Add a `.env` file with a `PRIVATEKEY`, `WSSPROVIDER`, `HTTPPROVIDER`,
  `ACCOUNT`

- run `node index.js` in terminal to start watching all transactions

> Head over to https://infura.io to get provider url

By default the script listens to all transactions on chain and gets all
information of these transactions. Other functions can be written to be executed
based on conditions of events happening in transactions.

> Listen to other evm chains using their providers
