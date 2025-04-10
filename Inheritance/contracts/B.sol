// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./A.sol";

contract B is A {
    function doubleValue() public view returns (uint256){
        return value * 2;
    }

    // this function is already exists into the smart contract A that's why we use override keyword.
    function speak() public override pure returns (string memory){
        return "Hey, I am B";
    }

    function speakFromA() public pure returns (string memory){
        return A.speak();
    }
}