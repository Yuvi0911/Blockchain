const { ethers } = require("hardhat")

async function main() {
    const Contract = await ethers.getContractFactory("StorageAccess");
    const contract = await Contract.deploy();
    await contract.waitForDeployment();

    console.log("Address of owner: ", contract.getAddress());

    console.log("Value at 0th slot of storage: ", (await contract.getSlot()).toString());
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
})