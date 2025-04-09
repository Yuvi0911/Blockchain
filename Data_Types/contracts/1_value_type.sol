// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ValueType1 {
    // these are value types data type
    uint public age = 21;
    bool public isActive = true;
    // address
    int8 public score = -10;
    bytes2 public b2 = "ab";
    
    // Variable Modifiers => 1) constant 2) immutable
    uint public constant MAX_SUPPLY = 1000;
    // immutable => owner never change
    address public immutable owner;

    constructor(uint _age, bool _isActive, int8 _score, bytes2 _b2){
        owner = msg.sender;
        age = _age;
        isActive = _isActive;
        score = _score;
        b2 = _b2;
    }

    function getOwner() public view returns(address){
        return owner;
    }

    function totalToken() public pure returns(uint){
        return MAX_SUPPLY * 2;
    }

    function updateAge(uint _age) public{
        age = _age;
    }
    function getAge() public view returns(uint){
        return age;
    }

    function updateIsActive(bool _isActive) public{
        isActive = _isActive;
    }
    function getIsActive() public view returns(bool){
        return isActive;
    }

    function updateScore(int8 _score) public{
        score = _score;
    }
    function getScore() public view returns(int8){
        return score;
    }

    function updateB2(bytes2 _b2) public{
        b2 = _b2;
    }
    function getB2() public view returns(bytes2){
        return b2;
    }
}