require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/8YIbcw3LeWWZxEP58Yllha_oebANKTpu",
      accounts: ["6d5a53a0b1bc15d5ed87574cd69a9e020754b2e5befd72f027def3ba5152f7ff"]
    }
  }
};
