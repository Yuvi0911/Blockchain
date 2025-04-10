// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract A {
    uint256 public value;

    function setValue(uint256 _val) public {
        value = _val;
    }
    function getValue() public view returns(uint256){
        return value;
    }

    // virtual function => this function can be overridden by child contracts.
    function speak() public virtual pure returns (string memory){
        return "Hey, I am A";
    } 
}