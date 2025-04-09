const { ethers } = require("hardhat");

async function main() {
    const Contract = await ethers.getContractFactory("ValueType1");
    const contract = await Contract.deploy(21, true, 100, "0x6162");
    await contract.waitForDeployment();
    console.log("Contract deployed at: ", await contract.getAddress());
    
    const owner = await contract.getOwner();
    console.log("Owner of the contract: ", owner);

    const tokenAmount = await contract.totalToken();
    console.log("Total Token: ", Number(tokenAmount)); 

    console.log("Values After Deployment of Contract =>")

    const age = await contract.getAge();
    console.log("Age: ", age.toString());

    const active = await contract.getIsActive();
    console.log("Active: ", active);

    const score = await contract.getScore();
    console.log("Score: ", Number(score));

    const b2 = await contract.getB2();
    console.log("B2: ", b2);

    console.log("Updated Values =>")

    await contract.updateAge(22);
    const updateAge = await contract.getAge();
    console.log("Updated Age: ", updateAge.toString());

    await contract.updateIsActive(false);
    const updateActive = await contract.getIsActive();
    console.log("Updated Active: ", updateActive);

    await contract.updateScore(50);
    const updateScore = await contract.getScore();
    console.log("Updated Score: ", Number(updateScore));

    await contract.updateB2("0x5960");
    const updateB2 = await contract.getB2();
    console.log("Updated B2: ", updateB2);
}

main().catch((err) => {
    console.log(err);
})