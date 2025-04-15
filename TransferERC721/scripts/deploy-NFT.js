const hre = require("hardhat");

async function main() {
    const MyNFT = await hre.ethers.getContractFactory("NFT");

    const contract = await MyNFT.deploy(
        "YuviNFT",
        "UV",
        "https://gateway.pinata.cloud/ipfs/",
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        500
    )
    await contract.waitForDeployment();

    console.log("NFT contract deployed to: ", contract.target);
}

main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
})

// 0x34f4A706Bb6b763F7ecB3D63A726a5e3997BEf35 => sepolia deployed smart contract address 
// 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 => hardhat localhost smart contract address