// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./A.sol";

contract C {
    A obj = new A();
    uint256 public f4_val = obj.f4();
}