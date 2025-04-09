const { ethers } = require("hardhat");

async function main(){
    const B = await ethers.getContractFactory("B");
    const b = await B.deploy();
    await b.waitForDeployment();
    console.log("Contract B deployed at: ", await b.getAddress());

    console.log("f1 public function return: ",(await b.f1_val()).toString());
    const val = await b.f3_val();
    console.log("f3 internal function return: ",val.toString());
}
main().catch((err) => {
    console.error("Deployment failed:", err);
    process.exit(1);
})