const { ethers } = require("hardhat");

async function main() {
  const B = await ethers.getContractFactory("B");
  const b = await B.deploy();
  await b.deployed();
  console.log("Contract B deployed at:", b.address);

  // Smart contract B ko deploy kr k hum smart contract A ka setValue function call kr rhe h kyoki Smart contract B smart contract A ki property inherit kr rha h. 
  await b.setValue(9);
  const double = await b.doubleValue();
  console.log("Double value is:", double.toString());

  const speakB = await b.speak();
  console.log(speakB.toString());

  const speakA = await b.speakFromA();
  console.log(speakA);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
