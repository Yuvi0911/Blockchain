// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./A.sol";

// call the public and internal function of A smart contract.
contract B is A{
    uint256 public f1_val = f1();
    uint256 public f3_val = f3();
}