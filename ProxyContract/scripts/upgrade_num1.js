const { ethers, upgrades } = require("hardhat");

async function main() {
    const NUM2 = await ethers.getContractFactory("NUM2");
    console.log("NUM1 is upgrading...");
    // jab bhi terminal close kr k dobara chlaye ge toh hume NUM1 SC dobara deploy krna hoga aur uska jo address milega usko yha paste krna hoga.
    // ye line proxy contract ko upgrade karti h from its current implementation (NUM1) to a new implementation (NUM2) bina proxy address ko bdle.
    await upgrades.upgradeProxy('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', NUM2);
    // '0x9fE...6e0'
// Ye aapke already deployed proxy contract ka address hai. Ye wahi proxy hai jo aapne deployProxy() se banaya tha.

// NUM2
// Ye naya contract implementation hai.
// upgrades.upgradeProxy(...)
// ye function piche proxy ka address same rkhta h lekin uska logic(implementation) ko NUM1 se NUM2 me upgrade kr deta h.

// proxy address(users ka address wahi rhta h) aur storage(Proxy contract ka storage preserved rhta h)
    console.log("NUM1 upgraded to NUM2");
}
main();