// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract A {
    uint256 private num = 4;
    // is function ko sbhi contract access kr skte h.
    function f1() public pure returns(uint256){
        return 1;
    }
    // is function ko keval ye contract access kr skta h
    function f2() private pure returns(uint256){
        return 1+1;
    }
    // is function ko ye contract aur is se inherit hone vale contract access kr skte h.
    function f3() internal pure returns(uint256){
        return f2() + 1;
    }
    // is function ko is k alava sbhi contract access kr skte h.
    function f4() external view returns(uint256){
        return num;
    }
    
}