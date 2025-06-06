const { ethers } = require("hardhat");

async function main() {
    const Calculator = await ethers.getContractFactory("Calculator");
    const calculator = await Calculator.deploy();
    await calculator.waitForDeployment();
    console.log("Calculator deployed to:", await calculator.getAddress());
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  