// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint initialSupply) ERC20("Yuvi", "UV"){
        // ye function hamare token ko blockchain pr mint kr dega.
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}