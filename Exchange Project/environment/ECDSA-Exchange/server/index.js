const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;

import { ec as EC } from "elliptic";
import SHA256 from "crypto-js/sha256";

app.use(cors());
app.use(express.json());


var ec = require('elliptic').ec;
var ec = new EC('secp256k1');
const balances = {};

for(let i = 0 ; i < 3; i++) {
  const key = ec.genKeyPair();// generate a keypair with elliptic
  const publicKey = key.getPublic().encode('hex');
  const privateKey = key.getPrivate.toString(16);
  console.log(publicKey + " with a private key of " + privateKey + "has a balance of 100");
  balances[publicKey] = 100;
  balances[i] = privateKey;
}

app.get('/balance/:address', (req, res) => {
  const {address} = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const {sender, recipient, amount} = req.body;
  balances[sender] -= amount;
  balances[recipient] = (balances[recipient] || 0) + +amount;
  res.send({ balance: balances[sender] });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
