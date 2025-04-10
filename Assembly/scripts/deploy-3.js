const { ethers } = require("hardhat");

async function main() {
    const Contract = await ethers.getContractFactory("HelloWorld");
    const contract = await Contract.deploy();
    await contract.waitForDeployment();

    console.log("Address of contract: ", contract.getAddress());

    console.log(await contract.getHello());
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
})