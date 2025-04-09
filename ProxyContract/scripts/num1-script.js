const { ethers, upgrades } = require("hardhat");

async function main(){
    const NUM1 = await ethers.getContractFactory("NUM1");
    console.log("Deploying NUM version 1");
    // proxy me NUM1 contract k andar k update function k logic ko call kr k num me 10 value store kr dega.
    // hum upgradeable smart contract deploy kar rahe ho using OpenZeppelin Upgrades Plugin. Ab hume is contract ko future me update krna h toh hum bina address change kiye isko update kr skte h.
    const num1 = await upgrades.deployProxy(NUM1, [20], {
        initializer: 'update'
    });
//     NUM1: Ye aapka contract hai, jo getContractFactory("NUM1") se mila.

// upgrades.deployProxy: Ye ek special function hai jo aapke contract ko proxy ke through deploy karta hai. Proxy ek beech ka contract hota hai jo user ke calls ko original contract (implementation) tak forward karta hai.

// [10]: Ye arguments hain jo aapke contract ke update() function ko diye ja rahe hain jab contract deploy ho raha hai. Jaise constructor mein hum parameters dete hain, waise hi yaha initializer mein diye jaate hain.

// initializer: 'update': Upgradeable contracts mein constructor use nahi hota, isliye hum ek function (usually initialize ya update) ko batate hain jise deployment ke time pe call karna hai. Yaha aap update() ko bataye ho.
    // proxy contract me num=10 ho jaiye ga.
    // num1 ko deploy kr dega.
    await num1.deployed();
    console.log("NUM1 deployed address", num1.address);
}

main();

// 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 => contract address

/*
    1) num1 contract ko deploy krdegi ye script.
        => Open 2 terminals.
        a) npx hardhat node
        b) npx hardhat run scripts/deploy.js --network localhost
    2) ab hum hardhat ka console open krege aur usme command likhe ge.
        a) npx hardhat console --network localhost
        b) const NUM1 = await ethers.getContractFactory("NUM1");
        c) const num1 = await NUM1.attach('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0')
        d) (await num1.get()).toString();
*/