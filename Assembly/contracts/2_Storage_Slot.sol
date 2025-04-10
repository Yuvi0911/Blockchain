// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageAccess {
    uint256 public myValue = 123;
    function getSlot() public view returns (uint256 val) {
        assembly{
            val := sload(0)
        }
    }
}