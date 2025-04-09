// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract A{
    uint256 private num;
    function f1() public pure returns(uint256){
        return 1;
    }
    function get() private view returns (uint256){
        return num;
    }
    function f3() internal pure returns(uint256){
        return 2+2;
    }
    function f4() external pure returns(uint256){
        return 4;
    }
}