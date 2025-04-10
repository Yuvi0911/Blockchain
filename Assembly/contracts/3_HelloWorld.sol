// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    function getHello() public pure returns (string memory){
        assembly {
            mstore(0x00, 0x20)
            mstore(0x20, 11)
            mstore(0x40, "Hello World")
            return(0x00, 0x60)
        }
    }
}