const { ethers } = require("hardhat");

async function main() {
    const Contract = await ethers.getContractFactory("MyToken");
    const contract = await Contract.deploy(10000);
    await contract.waitForDeployment();

    console.log("Token deployed at: ", await contract.getAddress());

    const [owner] = await ethers.getSigners();
    console.log("Deployed contract with account:", await owner.getAddress());
    const balance = await contract.balanceOf(owner.address)
    console.log("Token into owner address: ", ethers.formatUnits(balance, 18));
}


main().catch((error) => {
    console.log(error);
    process.exitCode = 1;
});

// deployed into localhost of hardhat =>
// Token deployed at:  0x5FC8d32690cc91D4c39d9d3abcBD16989F875707
// Deployed contract with account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// Token into owner address:  10000.0
