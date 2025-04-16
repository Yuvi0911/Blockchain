import React, { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "a",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "b",
        "type": "int256"
      }
    ],
    "name": "add",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "a",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "b",
        "type": "int256"
      }
    ],
    "name": "divide",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getResult",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "a",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "b",
        "type": "int256"
      }
    ],
    "name": "multiply",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256",
        "name": "a",
        "type": "int256"
      },
      {
        "internalType": "int256",
        "name": "b",
        "type": "int256"
      }
    ],
    "name": "subtract",
    "outputs": [
      {
        "internalType": "int256",
        "name": "",
        "type": "int256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(null);

  const connectAndOperate = async (operation) => {
    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const calculator = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    let tx;
    if (operation === "add") tx = await calculator.add(a, b);
    if (operation === "sub") tx = await calculator.subtract(a, b);
    if (operation === "mul") tx = await calculator.multiply(a, b);
    if (operation === "div") tx = await calculator.divide(a, b);

    await tx.wait();
    const res = await calculator.getResult();
    setResult(res.toString());
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🧮 Calculator DApp</h2>
      <input type="number" placeholder="Value A" onChange={(e) => setA(e.target.value)} />
      <input type="number" placeholder="Value B" onChange={(e) => setB(e.target.value)} />

      <div>
        <button onClick={() => connectAndOperate("add")}>Add</button>
        <button onClick={() => connectAndOperate("sub")}>Subtract</button>
        <button onClick={() => connectAndOperate("mul")}>Multiply</button>
        <button onClick={() => connectAndOperate("div")}>Divide</button>
      </div>

      <h3>Result: {result}</h3>
    </div>
  );
}

export default App;
