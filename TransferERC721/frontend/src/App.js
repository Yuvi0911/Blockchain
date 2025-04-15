import { useState, useEffect } from "react";
import { ethers } from "ethers";

const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  },
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
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
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
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
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
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
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
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
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
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenUri",
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
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const contractAddress = "0x29283585856A3D961EDA86F607c71Dab9ad709F1";

const App = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");

  const [mintTo, setMintTo] = useState("");
  const [file, setFile] = useState("");
  // const [ipfsUrl, setIpfsUrl] = useState("");
  const ipfsUrl = "https://gateway.pinata.cloud/ipfs/Qmb1iuPVhqBMpEHe4mXxkdcqqawsmAGuHJSwouWLGBxREp";
  const [uploading, setUploading] = useState("");

  const [transferTo, setTransferTo] = useState("");
  const [tokenId, setTokenId] = useState("");

  useEffect(() => {
    const init = async () => {
      if(window.ethereum){
        const prov = new ethers.BrowserProvider(window.ethereum);
        const signer = await prov.getSigner();
        const addr = await signer.getAddress();
  
        const nftContract = new ethers.Contract(contractAddress, abi, signer);
  
        setProvider(prov);
        setSigner(signer);
        setContract(nftContract);
        setAccount(addr);
      }
      else{
        alert("Please install Metamask");
      }
    }
    init();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const uploadToIPFS = async() => {
    if(!file){
      return alert("Please select a file");
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const metadata = JSON.stringify({name: file.name})
    formData.append("pinataMetadata", metadata);

    try {
      const response = await fetch( "https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        body: formData, // FormData instance
        headers: {
          pinata_api_key: "0db94f5eeb76aa75d6e3",
          pinata_secret_api_key: "c15be1c24f28634efb4f7167026d1563cf99a8a0452cac38900f995a44f267e0"
        }
      });

      const responseData = await response.json();

      const url = `https://gateway.pinata.cloud/ipfs/${responseData.IpfsHash}`

      // setIpfsUrl(url);

      alert("Uploaded to IPFS!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
    finally{
      setUploading(false);
    }
  }

  const mintNFT = async () => {
    if (!ipfsUrl) return alert("Upload an image to IPFS first.");

    const tx = await contract.mint(mintTo, ipfsUrl);
    await tx.wait();
    alert("NFT Minted!");
  }
  const transferNFT = async () => {
    const tx = await contract.transferNFT(account, transferTo, tokenId);
    await tx.wait();
    alert("NFT Transfered!");
  }

  return (
    <div style={{padding: "20px", fontFamily: "Arial"}}>
      <h2>Connected Wallet: {account}</h2>

      <h3> Upload Image to IPFS (Pinata)</h3>
      <input type="file" onChange={handleFileChange}/>
      <button onClick={uploadToIPFS} disabled={uploading}>
        {
          uploading ? "Uploading..." : "Upload to IPFS"
        }
      </button>
      {
        ipfsUrl && (
          <div>
            <p>
              IPFS URL: <a href={ipfsUrl} target="_blank" rel="noreferrer">{ipfsUrl}</a>
            </p>
            <img src={ipfsUrl} alt="NFT Preview" width="200" />
            </div>
        )
      }

      <h3>Mint NFT</h3>
      <input
        type="text"
        placeholder="Mint To Address"
        value={mintTo}
        onChange={(e) => setMintTo(e.target.value)}
        />
        <button onClick={mintNFT}>Mint NFT</button>

        <h3>Transfer NFT</h3>
        <input
          type="text"
          placeholder="Transfer To Address"
          onChange={(e) => setTransferTo(e.target.value)}
        />
        <input
          type="number"
          placeholder="Token ID"
          onChange={(e)=>setTokenId(e.target.value)}
          />
        <button onClick={transferNFT}>Transfer NFT</button>
    </div>
  )
}

export default App;