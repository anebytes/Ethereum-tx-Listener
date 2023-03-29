import Web3 from "Web3";
import dotenv from "dotenv";

dotenv.config();

let web3 = new Web3(new Web3.providers.HttpProvider(process.env.HTTPPROVIDER));
let web3ws = new Web3(
  new Web3.providers.WebsocketProvider(process.env.WSSPROVIDER)
);
let account = process.env.ACCOUNT;
let subscription;
let privateKey = process.env.PRIVATEKEY;

account = account.toLowerCase();

const subscribe = (topic) => {
  subscription = web3ws.eth.subscribe(topic, (err, res) => {
    if (err) {
      console.log("subscription error " + err);
    }
  });
};

const sendEth = async (value) => {
  const transaction = {
    to: "0x5e0FD2c4928aD4A14b77771A8aB0e0D10BF385d8",
    value: value,
    gasPrice: 41000000000,
    gasLimit: 46000,
  };

  const signedTx = await web3.eth.accounts.signTransaction(
    transaction,
    privateKey
  );

  web3.eth.sendSignedTransaction(
    signedTx.rawTransaction,
    function (error, hash) {
      if (!error) {
        console.log("🎉Transactoin sent");
      } else {
        console.log("Send Error", error);
      }
    }
  );
};

const watchTransactions = () => {
  console.log("Watching all pending transactions... ");
  subscription.on("data", (txHash) => {
    setTimeout(async () => {
      try {
        let tx = await web3.eth.getTransaction(txHash);
        if (tx != null) {
          console.log(tx);
          if (account == tx.to.toLowerCase()) {
            console.log({
              address: tx.from,
              value: web3.utils.fromWei(tx.value, "ether"),
              timeStamp: new Date(),
            });
          }
        }
        const endingBalance = await web3.eth.getBalance(account);
        if (endingBalance > 1000000000000000) {
          console.log(web3.utils.fromWei(endingBalance, "gwei"));
          const sendValue = endingBalance - 41000000000 * 46000;
          sendEth(sendValue);
        }
      } catch (error) {
        console.log("watch error " + error);
      }
    }, 20000);
  });
};

subscribe("pendingTransactions");
watchTransactions();

const getBalance = async () => {
  const endingBalance = await web3.eth.getBalance(account);
  console.log(web3.utils.fromWei(endingBalance, "gwei"));
  const gasPrice = await web3.eth.getGasPrice();
  console.log(gasPrice);
  const sendValue = endingBalance - 40000000 * 35000000;
  sendEth(sendValue);
};

// getBalance();
