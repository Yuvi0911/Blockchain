const { ethers } = require("hardhat");

async function main(){
    const Contract = await ethers.getContractFactory("Add");
    const contract = await Contract.deploy();
    await contract.waitForDeployment();

    console.log("Address of Owner: ", contract.getAddress());

    console.log("Addition: ", (await contract.addViaAssembly(5,1)).toString());
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
})