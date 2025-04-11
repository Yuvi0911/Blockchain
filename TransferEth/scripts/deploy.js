const hre = require("hardhat");

async function main() {
    const Contract = await hre.ethers.getContractFactory("TransferEther");
    const contract = await Contract.deploy();
    await contract.waitForDeployment();

    console.log("Contract deployed to:", await contract.getAddress());

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0