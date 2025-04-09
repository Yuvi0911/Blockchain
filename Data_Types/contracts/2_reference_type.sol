// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ReferenceType2 {
    // Structure
    struct User {
        string name;
        uint age;
    }
    User public user;

    uint public constant MAX_SUPPLY = 1000;
    // immutable => owner never change
    address public immutable owner;

    constructor(string memory _name, uint _age){
        user.name = _name;
        user.age = _age;
    }

    function setUser(string memory _name, uint _age) public {
        user = User(_name, _age);
    }
    function getUser() public view returns(string memory, uint){
        return (user.name, user.age);
    }

    // Fixed Array
    uint[4] public arr = [10, 20, 30, 40];

    // Dynamic Array
    string[] public name;
    function addName(string memory _name) public {
        name.push(_name);
    }
    function getName(uint index) public view returns (string memory) {
        require(index < name.length, "Index out of range");
        return name[index];
    }

    // Mapping
    mapping(uint => string) Emp;
    function setEmp(uint _id, string memory _name) public {
        Emp[_id] = _name;
    }
    function getEmpById(uint _id) public view returns(string memory){
        return Emp[_id];
    }
}