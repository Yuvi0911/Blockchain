require('dotenv').config();
const {ethers} = require('ethers')

/*
    Step-1) koi 3rd party website se RPC lege jiski help se hum apne laptop ko node bna ske.
    2) ek random wallet create krege, jiski help se different multiple accounts bna skte h jiski differenet public and private key hogi.
    3) apne metamask me se kisi account se private key lege aur ethers ki help se us account ka address lege.
    4) apne wallet ki help se transaction ko sign krege.
    5) ek account se dusre account me sepolia transfer krege.
*/

const apiKey = process.env["apiKey"];
const network = 'sepolia';
const node = `https://go.getblock.io/${apiKey}/`;

// ye line hamare local computer ko blockchain ki node me convert kr dega.
const provider = new ethers.JsonRpcProvider(node);

// create random account like metamask "create account"
const walletTo = ethers.Wallet.createRandom();
console.log("To Wallet:", walletTo);
console.log("To Address:",walletTo.address);

// load account from private key (sender)
const privateKey = process.env["privateKey"];
const walletFrom = new ethers.Wallet(privateKey, provider);
console.log("From Wallet:", walletFrom.address);

// gas limit => kitni units of gas lag skte h.
// gas price => 1 gas unit ka price kya hoga.
// Transaction Fee => gasLimit * gasPrice
// gasLimit = 21000
// gasPrice = 30 gwei = 30 × 10⁹ wei
// Total Fee = 21000 × 30 × 10⁹ = 630,000,000,000,000 wei
//           ≈ 0.00063 ETH

const sendEth = async () => {
    // set gasPrice and gasLimit manually
    const gasPrice = ethers.parseUnits("10", "gwei");
    const gasLimit = 21000;     // Standard for ETH transfer

    const tx = {
        to: walletTo.address,
        value: ethers.parseEther("0.001"),
        // gasLimit and gasPrice optional - ethers will estimate
        gasLimit: gasLimit,
        gasPrice: gasPrice
    }

    // estimate gas limit
    // const gasLimit = await provider.estimateGas({
    //     ...tx,
    //     from: walletFrom.address
    // })
    // console.log("Estimated Gas Limit:", gasLimit.toString());

    // get current gas price
    // const feeData = await provider.getFeeData();
    // const gasPrice = feeData.gasPrice;
    // console.log("Current Gas Price (wei):", gasPrice.toString());

    // calculate estimated gas price
    // const gasFeeInWei = gasLimit * gasPrice;
    // const gasFeeInEth = ethers.formatEther(gasFeeInWei.toString());
    // console.log("Estimates Gas Fee (Eth): ", gasFeeInEth);

    console.log("Sending transcation...");
    // walletFrom k paas private key h toh ether.js apne aap 1) Transaction build krta h. 2) Gas estimate krta h. 3) Transaction ko sign krta h using the wallet's private key. 4) Us signed tx ko blockchain pr send krta h.
    const txResponse = await walletFrom.sendTransaction(tx);
    console.log("Transaction Sent! Hash:", txResponse.hash);

    const receipt = await txResponse.wait();
    console.log("Transaction Mined! Block:", receipt.blockNumber);
}

sendEth().catch(console.error);