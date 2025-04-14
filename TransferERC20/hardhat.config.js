require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    amoy: {
      url: 'https://polygon-amoy.g.alchemy.com/v2/SM_pVHgOxFbzQOW5MqRqaszHVb-FRKC0',
      accounts: ['6d5a53a0b1bc15d5ed87574cd69a9e020754b2e5befd72f027def3ba5152f7ff']
    }
  },
  etherscan: {
    apiKey: {
      polygonAmoy: 'V7SD345NT29PF37C1JUAFQY6W7F2I9R79H'
    }
  }
};
