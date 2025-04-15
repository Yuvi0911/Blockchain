const hre = require("hardhat");

async function main() {
    const NFT = await hre.ethers.getContractFactory("UVNFT");
    const nft = await NFT.deploy("UVNFT", "UV");
    await nft.waitForDeployment();

    console.log("UVNFT deployed to: ", await nft.getAddress());
}

main().catch((error) => {
    console.log(error);
    process.exit = 1;
})

// 0x29283585856A3D961EDA86F607c71Dab9ad709F1 => sepolia deployed smart contract address 