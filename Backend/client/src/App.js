import { useEffect, useState } from "react";
import { ethers } from "ethers";

const contractConfig = {
  localhost: {
    chainId: "31337",
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    rpcUrl: "http://127.0.0.1:8545"
  },
  sepolia: {
    chainId: "11155111",
    address: "0x8bDBec9327f9485B827A430E98a460166a2bC036",
    rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/8YIbcw3LeWWZxEP58Yllha_oebANKTpu"
  },
  abi: [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "oldMessage",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "newMessage",
          "type": "string"
        }
      ],
      "name": "MessageUpdated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getMessage",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "message",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "newMessage",
          "type": "string"
        }
      ],
      "name": "setMessage",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}

function App() {
  const [chain, setChain] = useState("localhost");
  const [message, setMessage] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");

  const getContract = () => {
    const selected = contractConfig[chain];
    const provider = new ethers.JsonRpcProvider(selected.rpcUrl);
    const signer = new ethers.Wallet("6d5a53a0b1bc15d5ed87574cd69a9e020754b2e5befd72f027def3ba5152f7ff", provider);
    return new ethers.Contract(selected.address, contractConfig.abi, signer);
  }

  const setNewMessage = async () => {
    const contract = getContract();
    const tx = await contract.setMessage(message);
    await tx.wait();
    alert("Message set!");
  }

  const fetchMessage = async () => {
    const contract = getContract();
    const msg = await contract.getMessage();
    setCurrentMessage(msg);
  }

  useEffect(() => {
    const contract = getContract();

    const handleEvent = (oldMessage, newMessage) => {
      console.log("Old Message: ", oldMessage);
      console.log("New Message:", newMessage);
      setCurrentMessage(newMessage);
    }

    contract.on("MessageUpdated", handleEvent);
  },[chain]);

  return (
    <div style={{ padding: 40 }}>
      <h1>Message DApp (Multi-Chain)</h1>

      <select onChange={(e) => setChain(e.target.value)} value={chain}>
        <option value="localhost">Localhost</option>
        <option value="sepolia">Sepolia</option>
      </select>
      <br/>
      <br/>

      <input
        type="text"
        placeholder="Your message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={setNewMessage}>Set Message</button>
      <button onClick={fetchMessage}>Get Message</button>

      <h3>Stored Message: {currentMessage}</h3>
    </div>
  )
}

export default App;
