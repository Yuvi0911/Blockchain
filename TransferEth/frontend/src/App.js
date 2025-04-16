import { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

// Replace with your deployed contract address
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Transferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "transfer",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
    } else {
      alert("Install MetaMask");
    }
  };

  const sendEther = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.transfer(recipient, {
        value: ethers.parseEther(amount)
      });

      await tx.wait();
      alert(`Transaction successful: ${tx.hash}`);
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    }
  };

  return (
    <div className="App">
      <h1>ETH Transfer DApp</h1>

      {walletAddress ? (
        <p>Connected Wallet: {walletAddress}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}

      <div>
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount (ETH)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={sendEther}>Send Ether</button>
      </div>
    </div>
  );
}

export default App;
