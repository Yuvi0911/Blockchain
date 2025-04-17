const hre = require("hardhat")

async function main() {
    const Contract = await hre.ethers.getContractFactory("Backend");
    const contract = await Contract.deploy();
    await contract.waitForDeployment();

    console.log("Contract deployed at address: ", await contract.getAddress());
} 

main().catch((err) => {
    console.error(err);
})

// 0x5FbDB2315678afecb367f032d93F642f64180aa3 => smart contract localhost address

// 0x8bDBec9327f9485B827A430E98a460166a2bC036 => smart contract sepolia address