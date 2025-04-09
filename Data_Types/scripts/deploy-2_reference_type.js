const { ethers } = require("hardhat");

async function main() {
    const Contract = await ethers.getContractFactory("ReferenceType2");
    const contract = await Contract.deploy("Yuvraj", 21);
    await contract.waitForDeployment();
    console.log("Contract Deployed at:", await contract.getAddress());

    console.log("Values After Deploymen =>");

    // structure
    const [name, age] = await contract.getUser();
    console.log("name: ", name);
    console.log("Age: ", Number(age));

    console.log("Update => ");
    await contract.setUser("Yuvi", 22);
    const [updateName, updateAge] = await contract.getUser();
    console.log("Update name: ", updateName);
    console.log("Update age: ", Number(updateAge));


    // Array
    await contract.addName("Yuvraj0");
    await contract.addName("Yuvraj1");
    await contract.addName("Yuvraj2");

    const name0 = await contract.getName(0);
    console.log("Name at position 0: ", name0);

    const name1 = await contract.getName(1);
    console.log("Name at position 0: ", name1);

    const name2 = await contract.getName(2);
    console.log("Name at position 0: ", name2);

    // Mapping
    await contract.setEmp(1, "UV1");
    const Emp1 = await contract.getEmpById(1);
    console.log("Emp at Id1: ", Emp1);
    await contract.setEmp(2, "UV2");
    const Emp2 = await contract.getEmpById(2);
    console.log("Emp at Id1: ", Emp2);
    await contract.setEmp(3, "UV3");
    const Emp3 = await contract.getEmpById(3);
    console.log("Emp at Id1: ", Emp3);

}

main();