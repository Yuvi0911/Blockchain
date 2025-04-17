// const express = require("express")
import express from "express";
// const { ethers } = require("ethers");
import { ethers } from "ethers";
// require("dotenv").config();
// const { PrismaClient } = require('@prisma/client');
import prisma from "./prisma/prismaClient.js";


const app = express();
app.use(express.json());

const ABI = [
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


const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/8YIbcw3LeWWZxEP58Yllha_oebANKTpu");
const wallet = new ethers.Wallet("6d5a53a0b1bc15d5ed87574cd69a9e020754b2e5befd72f027def3ba5152f7ff", provider);
const contractAddress = "0x8bDBec9327f9485B827A430E98a460166a2bC036";

const contract = new ethers.Contract(contractAddress, ABI, wallet);

app.post("/send-message", async (req, res) => {
    try {
        const { message } = req.body;
        console.log("Message received from frontend: ", message);

        const tx = await contract.setMessage(message);
        console.log(tx);

        const receipt = await tx.wait();
        console.log("Transaction Receipt: ", receipt);

        console.log("Block No:", receipt.blockNumber);

        const dbMessage = await prisma.message.create({
          data: {
            text: message,
            txHash: tx.hash,
            to: tx.to,
            from: tx.from,
            message: message
          }
        });
        

        console.log("Data stored into db: ", dbMessage);

        res.json({
            success: true,
            txHash: tx.hash
        })
    } catch (error) {
        console.error("Smart contract error", error);
    }
})

app.get('/get-message', async (req, res) => {
    try {
        const tx = await contract.getMessage();
        console.log(tx);
        res.json({
            success: true,
            tx
        })
    } catch (error) {
        console.error(error)
    }
})


app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
})
