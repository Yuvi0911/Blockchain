const { ethers } = require("hardhat");

async function main() {
    const C = await ethers.getContractFactory("C");
    const c = await C.deploy();
    await c.waitForDeployment();

    console.log("Contract C deployed at: ", await c.getAddress());

    const f4val = await c.f4_val();

    console.log("f4 external function return: ", f4val.toString());

}

main().catch((err) => {
    console.error("Deployment failed:", err);
    process.exit(1);
})