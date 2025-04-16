require('dotenv').config();

const Web3 = require('web3');

const apiKey = process.env['apiKey']
const network = 'sepolia'

const node = `https://go.getblock.io/${apiKey}/`;
console.log("RPC NODE URL:", node);


// https://account.getblock.io/ => hum apne computer ko blockchain ka node bnane k liye hum is url se RPC se lege.
const web3 = new Web3(node);

// console.log(web3);

// ye line randomly new account generate kr deti h, jaise hum metamask me jaa kr create button pr click kr k 1 new account generate krte h aur metamask hume randomly ek address de deta h waise hi ye line kaam kregi.
const accountTo = web3.eth.accounts.create();
// account ka address, privateKey, etc cheeje generate ho gyi h.
console.log(accountTo)
console.log(accountTo.address)

// hum env me jis account ki private key store ki h uski help se us account ka address lege.
const privateKey = process.env["privateKey"]
const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey);
console.log(accountFrom);

// with the help of this function sign our transaction
const createSignedTx = async(rawTx) => {
    rawTx.gas = await web3.eth.estimateGas(rawTx);
    return await accountFrom.signTransaction(rawTx);
}

// is function ki help se hum signed transaction ko send krege
const sendSignedTx = async(signedTx) => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log)
}

const amountTo = "0.001";
const rawTx = {
    to: accountTo.address,
    value: web3.utils.toWei(amountTo, "ether")
}

// rawTx ko sign kr k 1 account se dure account me transfer krega.
createSignedTx(rawTx).then(sendSignedTx)