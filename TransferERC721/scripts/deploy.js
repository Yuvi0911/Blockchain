const { ethers } = require("hardhat");

async function main() {
    const NFT = await ethers.getContractFactory("MyNFT");
    const nft = await NFT.deploy();
    await nft.waitForDeployment();

    console.log("UVNFT Contract deployed to: ", await nft.getAddress());

}

main().catch((error) => {
    console.log(error);
})

// address => 0x5FbDB2315678afecb367f032d93F642f64180aa3